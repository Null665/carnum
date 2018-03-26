#!/usr/bin/env bash
# Virtualev setup
virtualenv -p /usr/bin/python3 venv
source venv/bin/activate
# django setup
cd back
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
# npm install
cd ../front/
npm install
cd ..
# bundle all together
./build.sh
