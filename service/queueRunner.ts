import Queue from 'bull';

const imageQueue = new Queue('test queue');

imageQueue.process(function (job, done) {
  // // transcode image asynchronously and report progress
  // job.progress(42);

  console.log('running job', JSON.stringify(job.data));
  // call done when finished
  done();

  // // or give an error if error
  // done(new Error('error transcoding'));

  // // or pass it a result
  // done(null, { width: 1280, height: 720 /* etc... */ });

  // // If the job throws an unhandled exception it is also handled correctly
  // throw new Error('some unexpected error');
});

for (let i = 0; i < 5; i++) {
  imageQueue.add({ image: 'http://example.com/image1.tiff' + i });
}
