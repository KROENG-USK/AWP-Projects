#include <FirebaseESP8266.h>

// Setting Firebase Database
#define FIREBASE_HOST ""
#define FIREBASE_AUTH ""

// root json firebase data
const String path_sensor_1 = "message-database/3-kelembapan-1/a";
const String path_sensor_2 = "message-database/4-kelembapan-2/a";
const String path_relay_1 = "switcher/switch-1";
const String path_relay_2 = "switcher/switch-2";
const String path_auto_relay = "switcher/auto";
const String path_hum_limit = "data-sensor-pompa-air/hum-limit";
const String path_limit_tampungan = "data-sensor-pompa-air/limit-tampungan";
const String path_tampungan = "data-sensor-pompa-air/sensor-tampungan";

FirebaseData firebaseData; // buat object firebaseData

void firebase_setup() {
  // Setup firebase auth & host link
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  Firebase.setReadTimeout(firebaseData, 1000 * 60);
}