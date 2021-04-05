const JobModel = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/jobUtils');

module.exports = {
	index(req, res) {
		const jobs = JobModel.get();
		const profile = Profile.get();

		let statusCount = {
			progress: 0,
			done: 0,
			totalJobs:jobs.length
		};

		//total de horas por dia pra jobs em progresso
		let totalHoursJobs = 0;

		const updatedJobs = jobs.map((job) => {
			const remaining = JobUtils.remainingDays(job);
			const status = remaining <= 0 ? 'done' : 'progress';

			//somando a quantidade de status
			statusCount[status] +=1;

			totalHoursJobs = status == 'progress' ? totalHoursJobs + Number(job['daily-hours']) : totalHoursJobs

					
			return {
				...job,
				remaining,
				status,
				budget: JobUtils.calculateBudget(job, profile['value-hour'])
			}
		});

		
		let freeHours = profile['hours-per-day'] - totalHoursJobs;

		res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours });

	},
}