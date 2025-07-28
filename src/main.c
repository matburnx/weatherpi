#include <time.h>
#include <stdio.h>
#include <stdlib.h>
#include "bme280.h"

int main() {
  bme280_calib_data cal;
  bme280_raw_data raw;

  int32_t t_fine;
  float temperature;
  float pressure;
  float humidity;
  int current_time;
  int current_day;

  FILE * output_file;
  int length;
  char * file_name;


  int fd = wiringPiI2CSetup(BME280_ADDRESS);
  if(fd < 0) {
    printf("Device not found");
    return -1;
  }

  readCalibrationData(fd, &cal);

  wiringPiI2CWriteReg8(fd, BME280_REGISTER_CONTROLHUMID, 0x01);   // humidity oversampling x 1
  wiringPiI2CWriteReg8(fd, BME280_REGISTER_CONTROL, 0x25);   // pressure and temperature oversampling x 1, mode normal

  getRawData(fd, &raw);

  t_fine = getTemperatureCalibration(&cal, raw.temperature);
  temperature = compensateTemperature(t_fine); // in Celsius
  pressure = compensatePressure(raw.pressure, &cal, t_fine) / 100; // in hPa
  humidity = compensateHumidity(raw.humidity, &cal, t_fine);       // in percentage 
  current_time = (int) time(NULL); // in sec
  current_day = current_time / 84600; // 24*60*60

  length = snprintf(NULL, 0, "%d.csv", current_day) + 1;
  file_name = (char *) malloc(sizeof(char)*length);
  snprintf(file_name, length, "%d.csv", current_day);

  output_file = fopen(file_name,"a");

  printf("%d,%.2f,%.2f,%.2f\n", current_time, temperature, humidity, pressure);
  printf("day: %d\n", current_day);

  fprintf(output_file,"%d,%.2f,%.2f,%.2f\n", current_time, temperature, humidity, pressure);

  free(file_name);
  fclose(output_file);
  return 0;
}
