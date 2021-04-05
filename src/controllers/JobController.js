const JobModel = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/jobUtils');



module.exports = {
	index(req, res) {
		const jobs = JobModel.get();
		const profile = Profile.get();

		const updatedJobs = jobs.map((job) => {
			const remaining = JobUtils.remainingDays(job);
			const status = remaining <= 0 ? 'done' : 'progress';

			return {
				...job,
				remaining,
				status,
				budget: JobUtils.calculateBudget(job, profile['value-hour'])
			}
		});


		res.render("index", { jobs: updatedJobs });

	},
	save(req, res) {
		const jobs = JobModel.get();
		const lastId = jobs[jobs.length - 1]?.id || 0;


		jobs.push({
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
	show(req, res) {
		const jobs = JobModel.get();
		const profile = Profile.get();

		const jobId = req.params.id;

		const job = jobs.find(job => Number(job.id) === Number(jobId));

		if (!job) {
			return res.send("Job not found!")
		}
		job.budget = JobUtils.calculateBudget(job, profile['value-hour'])

		return res.render("job-edit", { job: job })

	},
	update(req, res) {
		const jobs = JobModel.get();
		const profile = Profile.get();

		const jobId = req.params.id;

		const job = jobs.find(job => Number(job.id) === Number(jobId));

		if (!job) {
			return res.send("Job not found!")
		}

		const updateJob = {
			...job,
			name: req.body.name,
			"total-hours": req.body['total-hours'],
			"daily-hours": req.body['daily-hours'],
			budget: JobUtils.calculateBudget(job, profile['value-hour'])
		}

		const newJobs = jobs.map(job => {
			if (Number(job.id) === Number(jobId)) {
				job = updateJob
			}
			return job;
		});

		JobModel.update(newJobs);

		return res.redirect('/job/' + job.id);
	},
	delete(req, res) {
		const jobId = req.params.id;
		JobModel.delete(jobId);
	

		return res.redirect('/')
	}
}