const Database = require('../db/config');


module.exports = {
    async get(){

      const db = await Database();

      const jobs = await db.all(`SELECT * FROM jobs`);

      await db.close();

      return jobs;
    },
    async getById(id){

      const db = await Database();

      const job = await db.all(`SELECT * FROM jobs WHERE id = ${id}`);

      await db.close();

      return job;
    },
    async update(job, jobId){
      const db = await Database();

     

      let query = `UPDATE jobs SET 
                  name = "${job.name}",
                  daily_hours = ${job.daily_hours},
                  total_hours = ${job.total_hours}
                  WHERE id = ${jobId}
      `

      const updatedJob = await db.run(query);

      await db.close();

      return updatedJob;
    },

    async delete(jobId){
      
      const db = await Database();

      let query = `DELETE FROM jobs WHERE id = ${jobId}`;

      await db.run(query);

      await db.close();
    },

    async save(newJob){
      const db = await Database();

      console.log("NEW JOB: " + JSON.stringify(newJob))

      await db.run(`INSERT INTO jobs(
        name,
        daily_hours,
        total_hours,
        created_at
    ) VALUES (
        "${newJob.name}",
        ${newJob.daily_hours},
        ${newJob.total_hours},
        ${newJob.created_at}
    
    )`);

      await db.close();
    }
   
  
}
