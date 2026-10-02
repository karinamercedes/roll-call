// The real photo of the roll (brightened/processed from the user's
// reference image), framed as the hero above the stack of question squares.
export default function RollHolder() {
  return (
    <div className="roll-photo-frame">
      <img
        src="/roll-photo.jpg"
        alt="A roll of toilet paper hanging against a teal background"
        className="roll-photo"
      />
    </div>
  )
}
