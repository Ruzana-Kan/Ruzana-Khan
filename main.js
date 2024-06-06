document.getElementById('downloadBtn').addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = 'CV.pdf'; // Replace with the actual path to your resume file
    link.download = 'resume.pdf';
    link.click();
});