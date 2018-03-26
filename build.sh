#!/usr/bin/env bash
cd front
ng build --prod --output-hashing none
cd ..
source venv/bin/activate
cd back
python manage.py collectstatic
