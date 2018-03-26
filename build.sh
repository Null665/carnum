cd front
ng build --prod --output-hashing none
source venv/bin/activate
cd ../back
python manage.py collectstatic
