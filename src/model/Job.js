let data = [
  {
    id: 1,
    name: "Pizzaria Guloso",
    "daily-hours": 3,
    "total-hours": 1,
    createad_at: Date.now(),
  },
  {
    id: 2,
    name: "OneTwo Project",
    "daily-hours": 3,
    "total-hours": 47,
    createad_at: Date.now(),
  },
];

module.exports = {
    get(){
        return data;
    },
    update(newJob){
        data = newJob;
    },
    delete(jobId){
      data = data.filter(job => Number(job.id) !== Number(jobId));

    },
    save(newJob){
        data.push(newJob)
    }
}
