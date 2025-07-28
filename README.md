# WeatheRPI
Fast and lightweight software to build your own weather station using a Raspberry Pi and a BME280 module.

## Dependencies
* gcc
* make
* libi2c-dev
* i2c-tools
* [WiringPI](https://github.com/WiringPi/WiringPi)

If you want to run the website (optional):
* [Node.js](https://nodejs.org/en/download), npm

Dependencies within npm:
```
npm install http-server chart.js
```

## Usage
```
git clone https://github.com/WiringPi/WiringPi

cd weatherpi

make

./bme280
```

To run the website:
```
npx http-server path/to/weatherpi/website
```
