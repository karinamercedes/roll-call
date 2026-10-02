// One "square" of toilet paper = one question. The dashed top edge is the
// perforation; answering and pressing "Tear off" advances to the next square.
export default function QuestionSquare({ step, total, children, onNext, nextDisabled, nextLabel = 'Tear off ->' }) {
  return (
    <div className="square">
      <div className="perforation" aria-hidden="true" />
      <div className="square-inner">
        <p className="step-count">Square {step} of {total}</p>
        {children}
        <button type="button" className="primary tear-btn" onClick={onNext} disabled={nextDisabled}>
          {nextLabel}
        </button>
      </div>
    </div>
  )
}
