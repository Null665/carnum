## Carnum

#### Build instructions
1. For the first time run `./init.sh` to intialize virtualenv and sqite database. You will be asked to create django superuser account.
2. `build.sh` should be run when angular frontend is updated. `build.sh` builds angular code and lets django `collectstatic` to pick it up.

#### Run
```
source venv/bin/activate
cd back
python manage.py runserver
```
or `./run.sh`

And then http://127.0.0.1:8000

---
If you use this code for any employment opportunity and you are not me, you should die.
