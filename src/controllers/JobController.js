const JobModel = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/jobUtils');



module.exports = {
	async save(req, res) {
		

		await JobModel.save({
			name: req.body.name,
			'daily_hours': req.body['daily_hours'],
			'total_hours': req.body['total_hours'],
			created_at: Date.now()
		});


		return res.redirect('/');
	},
	create(req, res) {
		return res.render("job")
	},
	async show(req, res) {
		const jobs = await JobModel.get();
		const profile = await Profile.get();

		const jobId = req.params.id;

		const job = jobs.find(job => Number(job.id) === Number(jobId));

		if (!job) {
			return res.send("Job not found!")
		}
		job.budget = JobUtils.calculateBudget(job, profile['value_hour'])

		return res.render("job-edit", { job: job })

	},
	async update(req, res) {
		
		const profile = await Profile.get();

		const jobId = req.params.id;

		if (!jobId) {
			return res.send("Job not found!");
		}

		const job = await JobModel.getById(jobId);
				

		if (!job) {
			return res.send("Job not found!");
		}

		const updateJob = {
			name: req.body.name,
			"total_hours": req.body['total_hours'],
			"daily_hours": req.body['daily_hours'],
			budget: JobUtils.calculateBudget(job, profile['value_hour'])
		}


		await JobModel.update(updateJob, jobId);

		return res.redirect('/job/' + jobId);
	},
	async delete(req, res) {
		const jobId = req.params.id;
		await JobModel.delete(jobId);
	

		return res.redirect('/')
	}
}