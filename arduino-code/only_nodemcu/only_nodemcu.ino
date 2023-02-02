#include <ESP8266WiFi.h>

// buat variabel sensor tanah
#define pinSensor A0

// buat variabel relay pompa
#define pinRelay_1 D1
#define pinRelay_2 D2

// Setting find WiFi Hotspot
#ifndef STASSID
#define STASSID "MASUKAN NAMA HOTSPOT"
#define STAPSK "MASUKAN PASSWORD"
#endif

const char* ssid = STASSID;
const char* password = STAPSK;

// reconnect wifi if hotspot disconnect
WiFiEventHandler wifiConnectHandler;
WiFiEventHandler wifiDisconnectHandler;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode_setup();

  // Register Event Handler
  wifiConnectHandler = WiFi.onStationModeGotIP(onWifiConnect);
  wifiDisconnectHandler = WiFi.onStationModeDisconnected(onWifiDisconnect);

  initWiFi();
  Serial.print(F("RSSI : "));
  Serial.println(WiFi.RSSI());

  firebase_setup();

  set_data_sensor();

}

void loop() {
  // put your main code here, to run repeatedly:

  // kirim data ke firebase
  push_data(map(analogRead(pinSensor), 0, 1023, 100, 0), 500);

  program_relay(map(analogRead(pinSensor), 0, 1023, 100, 0), pinRelay_1, pinRelay_2, 1000);

}
