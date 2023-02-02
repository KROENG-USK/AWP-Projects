// buat variable millis waktu sebelum diproses program
unsigned long lastTime_1 = 0;
unsigned long lastTime_2 = 0;

// membuat fungsi pinMode komponen
void pinMode_setup() {
  // set pin relay menjadi OUTPUT
  pinMode(pinRelay_1, OUTPUT);
  pinMode(pinRelay_2, OUTPUT);
}

// buat fungsi kirim data ke firebase
void push_data(int data_1, int pending) {
  // buat variabel millis waktu sedang diproses program
  unsigned long currentTime = millis();

  if ((unsigned long) (currentTime - lastTime_1) >= pending) {
    lastTime_1 = currentTime;
    // push data in database
    Firebase.setInt(firebaseData, path_sensor_1, data_1);
    delay(10);
  }
}

// buat fungsi program relay
void program_relay(int data, int pin_relay_1, int pin_relay_2, int pending) {
  unsigned long currentTime = millis();

  if ((unsigned long) (currentTime - lastTime_2) >= pending) {
    lastTime_2 = currentTime;
    // ambil data boolean di database
    bool boolean_relay_1, boolean_relay_2, boolean_relay_auto;
    Firebase.getBool(firebaseData, path_relay_1, &boolean_relay_1);
    Firebase.getBool(firebaseData, path_relay_2, &boolean_relay_2);
    Firebase.getBool(firebaseData, path_auto_relay, &boolean_relay_auto);

    if (boolean_relay_1 == true) {
      digitalWrite(pin_relay_1, HIGH);
    } else {
      digitalWrite(pin_relay_1, LOW);
    }

    if (boolean_relay_2 == true) {
      digitalWrite(pin_relay_2, HIGH);
    } else {
      digitalWrite(pin_relay_2, LOW);
    }

    if (boolean_relay_auto == true) {
      if (data >=)
    } else {
      digitalWrite(pin_relay_1, LOW);
      digitalWrite(pin_relay_2, LOW);
    }
  }
}

void set_data_sensor() {
  Firebase.setInt(firebaseData, path_sensor_1, 0);
  // Firebase.setInt(firebaseData, path_sensor_2, 0);
  // Firebase.setInt(firebaseData, path_tampungan, 0);
  delay(10);
}