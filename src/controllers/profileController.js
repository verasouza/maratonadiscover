const Profile = require('../model/Profile');

module.exports = {
   async index(req, res) {
      const profile = await Profile.get();
      
        return res.render("profile", { profile })
    
      },

     async update(req, res){
        const data =  req.body;
        const weekPerYear = 52;
        //semanas trabalhadas no mes
        const weeksPerMonth = (weekPerYear - data["vacation_per_year"]) / 12; 
        //total de horas trabalhadas na semana
        const weekTotalHours = data["hours_per_day"] * data["days_per_week"]; 
        //horas trabalhadas no mes
        const monthlyTotalHours = weekTotalHours * weeksPerMonth;
        //valor da hora
        const valueHours = data['monthly_budget'] / monthlyTotalHours;

        const profile = await Profile.get();

        await Profile.update({
            ...profile,
          ...req.body,
          "value_hour": valueHours
        });
  
        
  
        return res.redirect('/profile')
  
  
      }
}