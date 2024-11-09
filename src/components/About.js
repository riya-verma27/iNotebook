import React from 'react';

const About = () => {
  return (
    <div className="container mt-5">
      {/* Heading Section */}
      <div className="text-center mb-5">
        <h1 className="display-4">About <span className="text-primary">iNotebook</span></h1>
        <p className="lead mt-3">Your personal cloud-based notebook to manage notes efficiently.</p>
      </div>

      {/* Features Section */}
      <div className="row mb-5">
        <div className="col-md-6">
          <img
            src="/iNotebookLogo.jpg" // Replace with a relevant image
            alt="About iNotebook"
            className="img-fluid rounded shadow-lg logo-img"
          />
        </div>
        <div className="col-md-6">
          <h2 className="mb-4">Why Choose <strong>iNotebook?</strong></h2>
          <p>
            iNotebook is designed to help you stay organized and never miss a thought or task. With cloud integration, your notes are available anywhere, on any device, with privacy and security guaranteed.
          </p>
          <ul className="list-unstyled">
            <li className="mb-2">
              <i className="fas fa-check-circle text-success me-2"></i><strong>Create Notes:</strong> Jot down your thoughts easily.
            </li>
            <li className="mb-2">
              <i className="fas fa-edit text-primary me-2"></i><strong>Update Notes:</strong> Edit your notes anytime.
            </li>
            <li className="mb-2">
              <i className="fas fa-trash-alt text-danger me-2"></i><strong>Delete Notes:</strong> Remove clutter by deleting unwanted notes.
            </li>
            <li className="mb-2">
              <i className="fas fa-cloud text-info me-2"></i><strong>Cloud Storage:</strong> Access your notes from anywhere.
            </li>
            <li>
              <i className="fas fa-lock text-warning me-2"></i><strong>Secure Authentication:</strong> Ensure your notes are private and protected.
            </li>
          </ul>
        </div>
      </div>

      {/* Features Grid Section */}
      <div className="mb-5">
        <h2 className="text-center mb-4">Key Features</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <i className="fas fa-sticky-note fa-3x text-primary mb-3"></i>
                <h5 className="card-title">Create Notes</h5>
                <p className="card-text">Quickly jot down your thoughts or to-dos and access them anytime.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <i className="fas fa-sync-alt fa-3x text-success mb-3"></i>
                <h5 className="card-title">Update Notes</h5>
                <p className="card-text">Easily modify your notes to keep them up-to-date and organized.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <i className="fas fa-trash-alt fa-3x text-danger mb-3"></i>
                <h5 className="card-title">Delete Notes</h5>
                <p className="card-text">Remove notes you no longer need and declutter your workspace.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="text-center mt-5">
        <h2>Get Started with <span className="text-primary">iNotebook</span> Today!</h2>
        <p className="lead">Sign up and manage your notes efficiently, securely, and from anywhere in the world.</p>
        <a href="/signup" className="btn btn-lg btn-primary me-2 mx-3">Sign Up Now</a>
        <a href="/login" className="btn btn-lg btn-outline-primary">Login</a>
      </div>
    </div>
  );
};

export default About;
