import React, {useEffect, useState, useRef } from "react"
const { Modal } = window.bootstrap;
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export default function RecipeModal(props) {
  const { user, recipe, isOpen, onClose, plannerUpdateSuccess } = props;

  const [planner, setPlanner] = useState({})
  const [showPlanner, setShowPlanner] = useState(false)

  const [newPlannerMealType, setNewPlannerMealType] = useState('breakfast')
  const [newPlannerBreakfastWeekDay, setNewPlannerBreakfastWeekDay] = useState(null)
  const [newPlannerLunchWeekDay, setNewPlannerLunchWeekDay] = useState(null)
  const [newPlannerDinnerWeekDay, setNewPlannerDinnerWeekDay] = useState(null)
  const [newPlannerError, setNewPlannerError] = useState(false)

  // Create a forward reference
  const modalRef = useRef()
  const [modalObj, setModalObj] = useState(null)
  useEffect(() => {
    if (modalRef.current && modalObj === null) {
      setModalObj(new Modal(modalRef.current, { backdrop: 'static' }))
    }
  }, [modalObj])

  // Synchronize the modal state with 'isOpen'
  useEffect(() => {
    if (modalObj !== null) {
      if (isOpen) {
        setShowPlanner(false)
        modalObj.show()
      } else {
        modalObj.hide()
      }
    }
  }, [isOpen, modalObj])

  useEffect(() => {
    if (user.userId !== 0) {
      getPlanner()
    }
  }, [user.userId])

  async function getPlanner() {
    //console.log(user.userId)
    try {
      const response = await fetch(`http://localhost:3081/planner/${user.userId}/`, {
        method: 'GET'
      })
      if (response.status === 200) {
        const resultPlanner = await response.json()
        setPlanner(resultPlanner)
        //console.log(resultPlanner)
      }
    } catch (error) {
      console.error('Error planner retrieval failed:', error)
    }
  }

  async function updatePlanner() {
    try {
      const response = await fetch(`http://localhost:3081/planner/${user.userId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(planner)
      })
      if (response.status === 200) {
        plannerUpdateSuccess(true)
        console.log('updated planner in database')
      }
    } catch (error) {
      console.error('Error planner update failed:', error)
    }
  }

  async function onPlannerSave() {
    let newPlanner = planner
    let weekDay
    switch(newPlannerMealType) {
      case 'breakfast':
        weekDay = newPlannerBreakfastWeekDay
        newPlanner.breakfast[weekDay] = {
          mealName: recipe.label,
          mealURI: recipe.uri,
          mealImage: recipe.image
        }
        break;
      case 'lunch':
        weekDay = newPlannerLunchWeekDay
        newPlanner.lunch[weekDay] = {
          mealName: recipe.label,
          mealURI: recipe.uri,
          mealImage: recipe.image
        }
        break;
      case 'dinner':
        weekDay = newPlannerDinnerWeekDay
        newPlanner.dinner[weekDay] = {
          mealName: recipe.label,
          mealURI: recipe.uri,
          mealImage: recipe.image
        }
        break;
      default:
        weekDay = null
    }
    if (weekDay === null) {
      // Show error message
      setNewPlannerError(true)
    } else {
      setNewPlannerError(false)
      setPlanner(newPlanner)
      // Submit new planner
      updatePlanner()
      // Close modal
      onClose()
    }
  }


  return (
    <div ref={modalRef} className="modal fade modal-lg">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="detailsModalLabel">
              {showPlanner?
                <span>Add {recipe.label} to Planner</span>
                :
                <span>{recipe.label}</span>
              }
            </h1>

            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            />
          </div>

          <div className="modal-body" id="detailsModalBody">
            {showPlanner?
              <div className="row mx-1">
                {newPlannerError ?
                  <div className="alert alert-warning" role="alert">
                    Please select a planner location for the recipe
                  </div>
                  :
                  null
                }
                Select where to assign recipe

                <div className="mt-4">
                  <div className="row mb-2">
                    <div className="list-group list-group-horizontal pe-0" id="list-tab"
                         role="tablist">
                      <a className="list-group-item list-group-item-action active text-center"
                         data-bs-toggle="list"
                         href="#list-breakfast"
                         role="tab"
                         onClick={() => {
                           setNewPlannerMealType('breakfast')
                         }}
                      >
                        Breakfast
                      </a>
                      <a className="list-group-item list-group-item-action text-center"
                         data-bs-toggle="list"
                         href="#list-lunch"
                         role="tab"
                         onClick={() => {
                           setNewPlannerMealType('lunch')
                         }}
                      >
                        Lunch
                      </a>
                      <a className="list-group-item list-group-item-action text-center"
                         data-bs-toggle="list"
                         href="#list-dinner"
                         role="tab"
                         onClick={() => {
                           setNewPlannerMealType('dinner')
                         }}
                      >
                        Dinner
                      </a>
                    </div>
                  </div>
                  <div className="row mt-2 overflow-auto">
                    <div className="tab-content p-0" id="nav-tabContent">
                      <div className="tab-pane fade show active" id="list-breakfast"
                           role="tabpanel">
                        <div className="list-group list-group-horizontal overflow-auto"
                             role="tablist">
                          {planner?.breakfast?.map((meal, index) => (
                            <a className="list-group-item list-group-item-action"
                               key={index}
                               data-bs-toggle="list"
                               role="tab"
                               onClick={() => {
                                 setNewPlannerBreakfastWeekDay(index)
                               }}
                            >
                              <h5>{weekDays[index]}</h5>
                              <img src={meal.mealImage} style={{height: '150px'}}
                                   alt="recipe image"/>
                              <h6>{meal.mealName}</h6>
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="tab-pane fade" id="list-lunch" role="tabpanel">
                        <div className="list-group list-group-horizontal overflow-auto"
                             role="tablist">
                          {planner?.lunch?.map((meal, index) => (
                            <a className="list-group-item list-group-item-action"
                               key={index}
                               data-bs-toggle="list"
                               role="tab"
                               onClick={() => {
                                 setNewPlannerLunchWeekDay(index)
                               }}
                            >
                              <h5>{weekDays[index]}</h5>
                              <img src={meal.mealImage} style={{height: '150px'}}
                                   alt="recipe image"/>
                              <h6>{meal.mealName}</h6>
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="tab-pane fade" id="list-dinner" role="tabpanel">
                        <div className="list-group list-group-horizontal overflow-auto"
                             role="tablist">
                          {planner?.dinner?.map((meal, index) => (
                            <a className="list-group-item list-group-item-action"
                               key={index}
                               data-bs-toggle="list"
                               role="tab"
                               onClick={() => {
                                 setNewPlannerDinnerWeekDay(index)
                               }}
                            >
                              <h5>{weekDays[index]}</h5>
                              <img src={meal.mealImage} style={{height: '150px'}}
                                   alt="recipe image"/>
                              <h6>{meal.mealName}</h6>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
              :
              <div className="row">
                <div className="col-6">
                  <img src={recipe.image} alt="recipe image" className="w-100"/>
                </div>
                <div className="col-6">
                  <ul className="list-group list-group-flush">
                    {recipe?.ingredientLines?.map((ingredient, index) => (
                      <li key={index} className="list-group-item">{ingredient}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      console.log('planner')
                      setNewPlannerMealType('breakfast')
                      setShowPlanner(true)
                    }}
                  >
                    {'Add to Planner'}
                  </button>
                </div>
              </div>
            }
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              {'Close'}
            </button>

            {showPlanner ?
              <button type="button" className="btn btn-primary"
                      onClick={onPlannerSave}
              >
                {'Save'}
              </button>
              :
              null
            }
          </div>
        </div>
      </div>
    </div>
  )
}
