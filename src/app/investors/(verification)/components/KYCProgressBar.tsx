'use client';

interface KYCProgressBarProps {
  currentStep: number;
}

const steps = [
  'Personal Information',
  'Identity Verification',
  'Accreditation',
  'Review & Approval',
];

export default function KYCProgressBar({ currentStep }: KYCProgressBarProps) {
  const totalSteps = steps.length;
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <section
      className="progress-container"
      style={{ textAlign: 'center', marginBottom: '4rem' }}
    >
      <h2>KYC & Accreditation Progress</h2>

      <div className="progress-bar">
        <div className="progress-line"></div>
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        ></div>

        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const status =
            stepNumber < currentStep
              ? 'completed'
              : stepNumber === currentStep
              ? 'active'
              : '';

          return (
            <div key={stepNumber} className={`progress-step ${status}`}>
              <div className="progress-circle">{stepNumber}</div>
              <div className="progress-label">{label}</div>
            </div>
          );
        })}
      </div>

      <p style={{ fontSize: '1.2rem' }}>
        Step {currentStep} of {totalSteps} – {steps[currentStep - 1]}
      </p>
    </section>
  );
}
