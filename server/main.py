import os
import requests

from flask import Flask, render_template, jsonify
from flask_caching import Cache

# https://en.wikipedia.org/wiki/ISO_4217
codes = {
    '784': 'AED', '971': 'AFN', '008': 'ALL', '051': 'AMD', '532': 'ANG',
    '973': 'AOA', '032': 'ARS', '036': 'AUD', '533': 'AWG', '944': 'AZN',
    '977': 'BAM', '052': 'BBD', '050': 'BDT', '975': 'BGN', '048': 'BHD',
    '108': 'BIF', '060': 'BMD', '096': 'BND', '068': 'BOB', '984': 'BOV',
    '986': 'BRL', '044': 'BSD', '064': 'BTN', '072': 'BWP', '933': 'BYN',
    '084': 'BZD', '124': 'CAD', '976': 'CDF', '947': 'CHE', '756': 'CHF',
    '948': 'CHW', '990': 'CLF', '152': 'CLP', '156': 'CNY', '170': 'COP',
    '970': 'COU', '188': 'CRC', '931': 'CUC', '192': 'CUP', '132': 'CVE',
    '203': 'CZK', '262': 'DJF', '208': 'DKK', '214': 'DOP', '012': 'DZD',
    '818': 'EGP', '232': 'ERN', '230': 'ETB', '978': 'EUR', '242': 'FJD',
    '238': 'FKP', '826': 'GBP', '981': 'GEL', '936': 'GHS', '292': 'GIP',
    '270': 'GMD', '324': 'GNF', '320': 'GTQ', '328': 'GYD', '344': 'HKD',
    '340': 'HNL', '191': 'HRK', '332': 'HTG', '348': 'HUF', '360': 'IDR',
    '376': 'ILS', '356': 'INR', '368': 'IQD', '364': 'IRR', '352': 'ISK',
    '388': 'JMD', '400': 'JOD', '392': 'JPY', '404': 'KES', '417': 'KGS',
    '116': 'KHR', '174': 'KMF', '408': 'KPW', '410': 'KRW', '414': 'KWD',
    '136': 'KYD', '398': 'KZT', '418': 'LAK', '422': 'LBP', '144': 'LKR',
    '430': 'LRD', '426': 'LSL', '434': 'LYD', '504': 'MAD', '498': 'MDL',
    '969': 'MGA', '807': 'MKD', '104': 'MMK', '496': 'MNT', '446': 'MOP',
    '478': 'MRO', '929': 'MRU', '480': 'MUR', '462': 'MVR', '454': 'MWK',
    '484': 'MXN', '979': 'MXV', '458': 'MYR', '943': 'MZN', '516': 'NAD',
    '566': 'NGN', '558': 'NIO', '578': 'NOK', '524': 'NPR', '554': 'NZD',
    '512': 'OMR', '590': 'PAB', '604': 'PEN', '598': 'PGK', '608': 'PHP',
    '586': 'PKR', '985': 'PLN', '600': 'PYG', '634': 'QAR', '946': 'RON',
    '941': 'RSD', '643': 'RUB', '646': 'RWF', '682': 'SAR', '090': 'SBD',
    '690': 'SCR', '938': 'SDG', '752': 'SEK', '702': 'SGD', '654': 'SHP',
    '694': 'SLL', '706': 'SOS', '968': 'SRD', '728': 'SSP', '930': 'STN',
    '222': 'SVC', '760': 'SYP', '748': 'SZL', '764': 'THB', '972': 'TJS',
    '795': 'TMM', '934': 'TMT', '788': 'TND', '776': 'TOP', '949': 'TRY',
    '780': 'TTD', '901': 'TWD', '834': 'TZS', '980': 'UAH', '800': 'UGX',
    '840': 'USD', '997': 'USN', '940': 'UYI', '858': 'UYU', '927': 'UYW',
    '860': 'UZS', '928': 'VES', '704': 'VND', '548': 'VUV', '882': 'WST',
    '950': 'XAF', '961': 'XAG', '959': 'XAU', '955': 'XBA', '956': 'XBB',
    '957': 'XBC', '958': 'XBD', '951': 'XCD', '960': 'XDR', '952': 'XOF',
    '964': 'XPD', '953': 'XPF', '962': 'XPT', '994': 'XSU', '963': 'XTS',
    '965': 'XUA', '999': 'XXX', '886': 'YER', '710': 'ZAR', '894': 'ZMK',
    '967': 'ZMW', '932': 'ZWL',
}

DEBUG = os.getenv('DEBUG', False)

app = Flask(
    __name__,
    template_folder='./build',
    static_folder='./build/static'
)
cache = Cache(app, config={'CACHE_TYPE': 'SimpleCache', 'DEBUG': DEBUG})


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/currencies')
@cache.cached(timeout=60 * 60 * 3)
def dashboard():
    url = 'https://api.monobank.ua/bank/currency'
    response = requests.get(url)
    if response.ok:
        rates = response.json()
        converted_rates = []
        for rate in rates:
            rate['currencyCodeA'] = codes[f'{rate["currencyCodeA"]:03d}']
            rate['currencyCodeB'] = codes[f'{rate["currencyCodeB"]:03d}']
            converted_rates.append(rate)
        return jsonify(converted_rates)
    return 'Cannot get currencies from Monobank API', 400


@app.route('/api/country/<code>')
@cache.memoize(timeout=60 * 60 * 3)
def country_code(code):
    url = f'https://restcountries.eu/rest/v2/currency/{code.lower()}'
    response = requests.get(url)
    if response.ok:
        return jsonify(response.json())
    return 'Cannot get country information', 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=DEBUG)
