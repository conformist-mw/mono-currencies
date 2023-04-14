Currency app by Monobank API
============================

Simple react app inspired by recently released Monobank API

Project dependencies
--------------------

Main dependencies are in ``requirements.txt`` and ``package.json``

How to install
--------------

.. code:: bash

   docker-compose build

How to run
----------

.. code:: bash

  docker-compose up

Build frontend before deploy
----------------------------

.. code:: bash

  docker run -it \
    --rm \
    -e NODE_ENV=production \
    -v ${PWD}:/app \
    -v ${PWD}/package.json:/app/src/package.json \
    react-currency_front npm run build
