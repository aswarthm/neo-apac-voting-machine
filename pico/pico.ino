int pins[] = { 0, 1, 2, 3 };
int device[] = { 0, 0, 0, 0 };
String a = "";
String prev = "";
void setup() {
  Serial.begin(9600);

  for (int i = 0; i < 2; i++) {
    pinMode(pins[i], INPUT);
  }
  pinMode(3, OUTPUT);
  digitalWrite(3, LOW);
  pinMode(4, OUTPUT);
  digitalWrite(4, LOW);
  setPins();
  while (!Serial)
    ;
}

void setPins() {
  a = "";
  for (int i = 0; i < 2; i++) {
    delay(20);
    a += int(digitalRead(pins[i]));
    while (digitalRead(pins[i]))
      ;
  }
}

void loop() {
  setPins();
  if (!a.equals(prev)) {
    prev = a;
    if (!a.equals("00")) {
      Serial.println(a);
      beepbeep();
    }
  }
  // if (Serial.available()) {        // If anything comes in Serial (USB),
  //   String a = Serial.readString();
  //   // for(int i = 0; i < 4; i++){
  //   //   device[i] = int(a[i]) - '0';
  //   //   Serial.println(device[i]);
  //   //   setPins();
  //   // }
  //   Serial1.write(Serial.read());  // read it and send it out Serial1 (pins 0 & 1)
  // }

  // if (Serial1.available()) {       // If anything comes in Serial1 (pins 0 & 1)
  //   Serial.write(Serial1.read());  // read it and send it out Serial (USB)
  // }
}

void beepbeep() {
  for (int i = 0; i < 4; i++) {
    digitalWrite(3, HIGH);
    digitalWrite(4, HIGH);
    delay(20);
  }
  digitalWrite(3, LOW);
  delay(1000);
  digitalWrite(4, LOW);
}
