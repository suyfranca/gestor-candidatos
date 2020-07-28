(function(doc, win){
  'use strict';

  let candidates = [
    { 
      id: 1,
      name: 'João',
      lastName: 'Batista',
      email: 'jbatista@gmail.com',
      salaryExpectation: 2200,
      skills: [ 'JavaScript', 'CSS', 'HTML', 'Linux' ]
    },
    { 
      id: 2,
      name: 'Maria',
      lastName: 'Silva',
      email: 'msilva@gmail.com',
      salaryExpectation: 3500,
      skills: [ 'Java', 'Gestão', 'PHP', 'Linux' ]
    },
    { 
      id: 3,
      name: 'Ana',
      lastName: 'Beatriz',
      email: 'abeatriz@gmail.com',
      salaryExpectation: 1000,
      skills: [ 'HTML' ]
    },
    { 
      id: 4,
      name: 'Matheus',
      lastName: 'Sousa',
      email: 'msousa@gmail.com',
      salaryExpectation: 1900,
      skills: [ 'HTML', 'CSS', 'Linux' ]
    }
  ];

  let $closeModal = doc.querySelector( '[data-js="modalClose"]' );
  let $saveModal = doc.querySelector( '[data-js="saveApplicant"]' );

  let $inputName = doc.querySelector( '[data-js="inputName"]' );
  let $email = doc.querySelector( '[data-js="email"]' );
  let $salary = doc.querySelector( '[data-js="salary"]' );
  let $skills = doc.querySelectorAll( '[data-js="checkSkills"]' )
    .forEach(function( skill ){
      skill.addEventListener( 'click', addSkill, false );
    }
  );

  let $modal = doc.querySelector( '[data-js="modalApplicant"]' );

  let $searchBtn = doc.querySelector( '[data-js="searchBtn"]' ); 
  let $createBtn = doc.querySelector( '[data-js="createBtn"]' );  

  function onChange( element1, element2, event ){
    element1.addEventListener( event, function(){
      element2.value = element1.value;
    }, false);
  } 


  function addSkill( e ){
    if ( this.checked ){
      skillsList.push( this.value );
      $fieldSkills.value = skillsList.join(', ');
      console.log(skillsList)
    } else {
      let position = skillsList.indexOf(this.value);
      skillsList.splice(position, 1);
      $fieldSkills.value = skillsList.join(', ');
      console.log( skillsList, $fieldSkills.value );
    }
  }

  /**Busca candidato */
  $btn.addEventListener( 'click', searchApplicant, false );

  function searchApplicant( event ){
    event.preventDefault();
    $modal.className = "modal collapse show";
   

    let bySalary = [];
    let bySkills = [];

    console.log(fieldsFilled);

    fieldsFilled.forEach( function(item) {
      byName = candidates.filter( function(itemCand){
        return itemCand.name == item.value;
      });
    });

    fieldsFilled.forEach( function(item) {
      byEmail = candidates.filter( function(itemCand){
        return itemCand.email == item.value;
      });
    });

    }


    if ( fieldsFilled.indexOf( 'applicant' ) !== -1 ){
      byName = searchByName();
    }

    // if ( fieldsFilled.indexOf( 'emailApplicant' ) !== -1 )
    //   searchByEmail();
    
    // if ( fieldsFilled.indexOf( 'salaryExpectation' ) !== -1 )
    //   searchBySalary();

    fieldsFilled = [];
    
  
  /**Verifica os campos preenchidos */
  function isItFilled(){
    let result = fields.forEach( function( field ){
      if ( field.value != "" )
        fieldsFilled.push(field);
    });
  }


  

  /** Buscas */
  function searchByName(){
    return candidates.filter( function( item ){
      return item.name == $inputName.value;
    });
  }

  function searchByEmail(){
    let byEmail = candidates.filter( function( item ){
      return item.email == $email.value;
    });
    return byEmail;
  }

  function searchBySalary(){
    let bySalary = candidates.filter( function( item ){
      return item.salaryExpectation <= $salary.value;
    });
    return bySalary;
  }

  
  /** Botões do Modal */

  $closeModal.addEventListener( 'click', closeModal, false );

  function closeModal( event ){
    event.preventDefault();
    $modal.className = "modal fade";
  }

  })(document, window);