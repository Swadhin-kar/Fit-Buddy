import { useState, useMemo, useEffect, lazy, Suspense } from "react";
const ExerciseInfo = lazy(() => import('./ExerciseInfo'));
// import ExerciseInfo from "./ExerciseInfo";

export default function Blog() {
  const [search, setSearch] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [exercises, setExercises] = useState([])


  const [openedExercise, setOpenedExercise] = useState(null)

  useEffect(() => {
    fetch('/alljson/exercises.json')
      .then((res) => res.json())
      .then((data) => {
        // console.log("Fetched exercises:", data);
        setExercises(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error fetching exercises: ", err))
  }, [])

  const filteredExercises = useMemo(() => {
    if (exercises.length === 0) return [];

    let size = 0;
    return exercises.filter((ex) => {
      const matchesSearch = ex.title.toLowerCase().includes(search.toLowerCase());
      const matchesGoal = selectedGoal ? ex.TrainingGoals.includes(selectedGoal) : true;
      const matchesMethod = selectedMethod ? ex.TrainingMethod.includes(selectedMethod) : true;
      if (matchesSearch && matchesGoal && matchesMethod && size < 18) {
        size++;
        return true;
      } else {
        return false;
      }
    })
  }, [exercises, search, selectedGoal, selectedMethod]);

  return (
    <div className="min-h-screen bg-base-100">

      {/* Hero */}
      <section className="px-6 py-10 text-center mt-10">
        <h1 className="text-3xl font-bold">Explore Exercises & Fitness Guides</h1>
        <p className="text-base-content/70 mt-2">
          Search exercises by goal, method or name
        </p>
      </section>

      {/* Search */}
      <div className="flex flex-col md:flex-row justify-around   px-6">
        <input
          type="text"
          placeholder="Search exercise..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => setSelectedGoal(e.target.value === "" ? null : e.target.value)}
          value={selectedGoal || ""}
        >
          <option value="">All Goals</option>
          <option value="
          Fat Loss">Weight/Fat Loss</option>
          <option value="Muscle Gain">Strength/Muscle Gain</option>
          <option value="Endurance">Endurance</option>
          <option value="Mobility">Mobility</option>
          <option value="Physiotherapy">Physiotherapy</option>
        </select>

        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => setSelectedMethod(e.target.value === "" ? null : e.target.value)}
          value={selectedMethod || ""}
        >
          <option value="">All Methods</option>
          <option value="Weighted">Weighted</option>
          <option value="Calisthenics">Calisthenics</option>
          <option value="Power Lifting">Power Lifting</option>
          <option value="Functional">Functional</option>
          <option value="Yoga">Yoga</option>
          <option value="Cardio">Cardio</option>
        </select>

      </div>

      {/* Filters */}
      {/* <section className="px-6 py-8 space-y-6">
        <FitnessGoal onSelect={setSelectedGoal} selected={selectedGoal} />
        <TrainingMethod onSelect={setSelectedMethod} selected={selectedMethod} />
      </section> */}

      {/* Exercise Grid */}

      <section className="px-6 pb-16 mt-10">
        {filteredExercises.length === 0 ? (
          <p className="text-center text-base-content/60">
            No exercises found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((ex) => (
              <div
                key={ex.id}
                className="Card bg-base-200 shadow-[0_2px_10px_rgba(72,72,72,0.95)] hover:shadow-[0_4px_20px_rgba(72,72,72,1)] transition rounded-lg "
              >
                <figure className="h-80 bg-base-300">
                  <img
                    src={ex.media.image ? ex.media.image : null}
                    alt={ex.name}
                    className="object-cover h-full w-full rounded-lg"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{ex.title}</h2>
                  <p className="text-sm text-base-content/70 line-clamp-2">
                    {ex.description}
                  </p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-sm btn-primary" onClick={() => setOpenedExercise(ex)}>
                      View Exercise
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {openedExercise && (
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <ExerciseInfo ex={openedExercise} onClose={() => { setOpenedExercise(null) }} />
          </Suspense>
        </div>
      )
      }
    </div>

  );
}
