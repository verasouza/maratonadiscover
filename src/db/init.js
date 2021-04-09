const Database = require('./config');


const initDb = {
	async init() {

		const db = await Database();


		await db.exec(
			`CREATE TABLE profile(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        monthly_budget INT,
        days_per_week INT,
        hours_per_day INT,
        vacation_per_year INT,
        value_hour INT
    )`
		);

		await db.exec(
			`CREATE TABLE jobs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        daily_hours INT,
        total_hours INT,
        created_at DATETIME
    )`
		);

		await db.run(`INSERT INTO profile(
    name,
    avatar,
    monthly_budget,
    days_per_week,
    hours_per_day,
    vacation_per_year,
    value_hour
) VALUES (
    "Veronica",
    "https://avatars.githubusercontent.com/u/51062873?v=4",
    8000,
    5,
    8,
    5,
    70
)`);

		await db.run(`INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "Pizzaria Guloso",
    3,
    1,
    '2021-03-31 10:00:00'

)`);

		await db.run(`INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "OneTwo Project",
    3,
	 47,
   '2021-04-05 10:00:00'

)`)

		await db.close();

	}

}

initDb.init();