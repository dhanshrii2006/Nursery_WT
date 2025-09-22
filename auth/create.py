import sqlite3
connection = sqlite3.connect('register.db')
cursor = connection.cursor()

command = """ CREATE TABLE IF NOT EXISTS register(
    first       TEXT,
    last        TEXT NOT NULL,
    username    TEXT NOT NULL UNIQUE,
    password    TEXT NOT NULL UNIQUE) """
cursor.execute(command)

cursor.execute("INSERT INTO register (first, last, username, password) VALUES ('Suresh', 'Kumar', 'suresh123', 'pass123')")
connection.commit()
print("Record inserted successfully")
