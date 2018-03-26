virtualenv -p /usr/bin/python3 venv
source venv/bin/activate
cd back
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
cd ..
./build.sh
