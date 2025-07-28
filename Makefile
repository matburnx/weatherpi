.PHONY: clean

bme280: src/main.c src/bme280.c src/bme280.h
	gcc -g -Wall -Wextra -pedantic src/bme280.c src/main.c -lwiringPi -lm -o bme280

clean:
	rm bme280
