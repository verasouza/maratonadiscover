const Profile = require('../model/Profile');

module.exports = {
    index(req, res) {
        return res.render("profile", { profile: Profile.get() })
    
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

        Profile.update({
            ...Profile.get(),
          ...req.body,
          "value-hour": valueHours
        });
  
        
  
        return res.redirect('/profile')
  
  
      }
}