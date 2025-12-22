import { useEffect, useRef } from "react";

const ExerciseInfo = ({ ex, onClose }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();

    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, [onClose]);

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box max-w-3xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">{ex.title}</h3>
          <span className="badge badge-primary">{ex.difficulty}</span>
        </div>

        {/* Image */}
        {ex.media?.image && (
          <img
            src={ex.media.image}
            alt={ex.title}
            className="w-full sm:44 md:h-56 object-cover rounded-lg mb-4"
          />
        )}

        {/* Description */}
        <p className="text-base-content/80 mb-4">
          {ex.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {ex.TrainingGoals.map(goal => (
            <span key={goal} className="badge badge-success badge-outline">
              {goal}
            </span>
          ))}
          {ex.TrainingMethod.map(method => (
            <span key={method} className="badge badge-info badge-outline">
              {method}
            </span>
          ))}
        </div>

        {/* Targeted Muscles */}
        <div className="mb-4">
          <h4 className="font-semibold mb-1">Targeted Muscles</h4>
          <ul className="list-disc list-inside text-sm">
            {ex.targetedMuscles.map(muscle => (
              <li key={muscle}>{muscle}</li>
            ))}
          </ul>
        </div>

        {/* Procedure */}
        <div className="mb-4">
          <h4 className="font-semibold mb-1">How to Perform</h4>
          <ol className="list-decimal list-inside text-sm space-y-1">
            {ex.procedure.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Common Mistakes */}
        <div className="mb-4">
          <h4 className="font-semibold mb-1 text-error">Common Mistakes</h4>
          <ul className="list-disc list-inside text-sm">
            {ex.commonMistakes.map(mistake => (
              <li key={mistake}>{mistake}</li>
            ))}
          </ul>
        </div>

        {/* Extra Info */}
        <div className="flex justify-between text-sm opacity-80 mb-4">
          <span>
            🔥 {ex.estimatedCaloriesBurnedPerMinute} cal / min
          </span>
          <span>
            🏋️ Equipment:{" "}
            {ex.equipmentRequired.length === 0
              ? "None"
              : ex.equipmentRequired.join(", ")}
          </span>
        </div>

        {/* Close */}
        <form method="dialog" className="text-right">
          <button className="btn btn-error btn-sm">Close</button>
        </form>
      </div>

      {/* Backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ExerciseInfo;
