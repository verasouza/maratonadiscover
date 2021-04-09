module.exports = {
    remainingDays(job) {
      //calcula dias restantes
      const remainingDays = (job['total_hours'] / job['daily_hours']).toFixed();
      //pega a data
      const createdDate = new Date(job.created_at);
      //calcula a data fim do projeto usando criação mais os dias restantes e retorna um numeros de dias X
      const dueDay = createdDate.getDate() + Number(remainingDays);
      //pega o valor de dias x e transforma em data em milisegundos
      const dueDate = createdDate.setDate(dueDay);

      //calcula a diferença entre hoje e a data fim do projeto em milisegundos
      const timeDiffInMs = dueDate - Date.now();
      //transforma o dia em milisegundos
      const dayInMs = 1000 * 60 * 60 * 24;
      //calcula a 
      var dayDifference = Math.ceil(timeDiffInMs / dayInMs);

      return dayDifference;
    },
    calculateBudget: (job, valueHour) => valueHour * job['total_hours']
  }