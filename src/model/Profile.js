let data = {
    name: 'Veronica',
    avatar: 'https://avatars.githubusercontent.com/u/51062873?v=4',
    "monthly-budget": 8000,
    "days-per-week": 5,
    "hours-per-day": 8,
    "vacation-per-year": 5,
    'value-hour': 70
}

module.exports = {
    get(){
        return data;
    },
    update(newData){
        data = newData;
    }

}


