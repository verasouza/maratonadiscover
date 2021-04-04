const express = require('express');
const routes = express.Router();


const Job = {
  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job);
        const status = remaining <= 0 ? 'done' : 'progress';

        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data['value-hour'])
        }
      });


      res.render("index", { jobs: updatedJobs });

    },
    save(req, res) {
      const lastId = Job.data[Job.data.length - 1]?.id + 1 || 0;


      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        'daily-hours': req.body['daily-hours'],
        'total-hours': req.body['total-hours'],
        createad_at: Date.now()
      });

      return res.redirect('/');
    },
    create(req, res) {
      return res.render("job")
    },
    show(req, res){
      const jobId = req.params.id;

      const job = Job.data.find(job => Number(job.id) === Number(jobId));
      
      if(!job){
        return res.send("Job not found!")
      }
      job.budget = Job.services.calculateBudget(job, Profile.data['value-hour'])

      return res.render("job-edit", {job: job})

    },
    update(req, res){
      const jobId = req.params.id;

      const job = Job.data.find(job => Number(job.id) === Number(jobId));
      
      if(!job){
        return res.send("Job not found!")
      }

      const updateJob = {
        ...job,
        name: req.body.name,
        "total-hours": req.body['total-hours'],
        "daily-hours": req.body['daily-hours'],
        budget: Job.services.calculateBudget(job, Profile.data['value-hour'])
      }

      Job.data = Job.data.map(job =>{
        if(Number(job.id) === Number(jobId)){
          job = updateJob
        }
        return job;
      });

      return res.redirect('/job/' + job.id);
    },
    delete(req, res){
      const jobId = req.params.id;

      //filter mantem os elementos true e remove os false, se o id é igual ao enviado ele remove do array
      Job.data = Job.data.filter(job =>Number(job.id) !== Number(jobId) )
           

      return res.redirect('/')
    }
  },
  services: {
    remainingDays(job) {
      //calcula dias restantes
      const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed();
      //pega a data
      const createdDate = new Date(job.createad_at);
      //calcula a data fim do projeto usando criação mais os dias restantes e retorna um numeros de dias X
      const dueDay = createdDate.getDate() + Number(remainingDays);
      //pega o valor de dias x e transforma em data em milisegundos
      const dueDate = createdDate.setDate(dueDay);

      //calcula a diferença entre hoje e a data fim do projeto em milisegundos
      const timeDiffInMs = dueDate - Date.now();
      //transforma o dia em milisegundos
      const dayInMs = 1000 * 60 * 60 * 24;
      //calcula a 
      var dayDifference = Math.floor(timeDiffInMs / dayInMs);

      return dayDifference;
    },
    calculateBudget: (job, valueHour) => valueHour * job['total-hours']
  },
  data: [
    {
      id: 1,
      name: "Pizzaria Guloso",
      'daily-hours': 3,
      'total-hours': 1,
      createad_at: Date.now(),
     
    },
    {
      id: 2,
      name: "OneTwo Project",
      'daily-hours': 3,
      'total-hours': 47,
      createad_at: Date.now(),
  
    }
  ]
}

const Profile = {
  data: {
    name: 'Veronica',
    avatar: 'https://avatars.githubusercontent.com/u/51062873?v=4',
    "monthly-budget": 8000,
    "days-per-week": 5,
    "hours-per-day": 8,
    "vacation-per-year": 5,
    'value-hour': 70
  },

  controllers: {
    index(req, res) {
      return res.render("profile", { profile: Profile.data })

    },
    update(req, res){
      const data =  req.body;
      const weekPerYear = 52;
      //semanas trabalhadas no mes
      const weeksPerMonth = (weekPerYear - data["vacation-per-year"]) / 12; 
      //total de horas trabalhadas na semana
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"]; 
      //horas trabalhadas no mes
      const monthlyTotalHours = weekTotalHours * weeksPerMonth;
      //valor da hora
      const valueHours = data['monthly-budget'] / monthlyTotalHours;

      Profile.data = {
        ...Profile.data,
        ...req.body,
        "value-hour": valueHours
      }

      return res.redirect('/profile')


    }
  }
}


routes.get('/', Job.controllers.index);

routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.update);

routes.get('/job', Job.controllers.create);
routes.get('/job/:id', Job.controllers.show);
routes.post('/job/:id', Job.controllers.update);
routes.post('/job/delete/:id', Job.controllers.delete);
routes.post('/job', Job.controllers.save);


module.exports = routes;