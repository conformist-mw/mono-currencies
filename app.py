from urllib import request

from flask import Flask, render_template

app = Flask(
    __name__,
    template_folder='./build',
    static_folder='./build/static'
)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/currencies')
def dashboard():
    url = 'https://api.monobank.ua/bank/currency'
    response = request.urlopen(url)
    if response.code == 200:
        return response.read()
    return 'Cannot get currencies from Monobank API', 400


@app.route('/country/<code>')
def country_code(code):
    url = f'https://restcountries.eu/rest/v2/currency/{code}'
    response = request.urlopen(url)
    if response.code == 200:
        return response.read(), 200
    return 'Cannot get country information', 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)