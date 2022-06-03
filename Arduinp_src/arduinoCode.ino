
// Variables for pot reading
int valX;
int valY;
bool changedX;
bool changedY;

// for normalized values
int horizontalVal = 0;
int verticalVal = 0;

// Some allowance to reduce noise down
const int threshold = 5;

void setup()
{
    Serial.begin(115200);
}

void loop()
{
    valX = analogRead(A0);
    valY = analogRead(A2);

    changedX = abs( valX - horizontalVal) >= threshold || ( valX == 0 && horizontalVal != 0) || (valX == 1023 && horizontalVal != 1023);
    changedY = abs( valY - verticalVal ) >= threshold || (valY == 0 && verticalVal != 0 ) || ( valY ==1023 && verticalVal != 1023);

    if (changedX || changedY){
        int invertedX = abs(1024 - valX);
        int invertedY = abs(1024 - valY);

        // Serial com (x,y)
        Serial.print(invertedX);
        Serial.print(",");
        Serial.println(invertedY);
        horizontalVal = valX;
        verticalVal = valY;
    }

    delay(100);
}
