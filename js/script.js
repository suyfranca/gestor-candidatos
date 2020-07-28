(function(doc, win){
  'use strict';

  let candidates = [
    { 
      fullName: 'João Batista',
      email: 'jbatista@gmail.com',
      salaryExpectation: 2200,
      skills: [ 'JavaScript', 'CSS', 'HTML', 'Linux' ]
    },
    { 
      fullName: 'Matheus Silva',
      email: 'msilva@gmail.com',
      salaryExpectation: 3500,
      skills: [ 'Java', 'Gestão', 'PHP', 'Linux' ]
    },
    { 
      fullName: 'Ana Beatriz',
      email: 'abeatriz@gmail.com',
      salaryExpectation: 1000,
      skills: [ 'HTML' ]
    },
    { 
      fullName: 'Marcos Sousa',
      email: 'msousa@gmail.com',
      salaryExpectation: 1900,
      skills: [ 'HTML', 'CSS', 'JavaScript' ]
    }
  ];

  let $modal = doc.querySelector( '[data-js="modalApplicant"]' );
  let $modalBody = doc.querySelector( '[data-js="modal-body"]' );
  let $closeModal = doc.querySelector( '[data-js="modalClose"]' );

  let $inputName = doc.querySelector( '[data-js="inputName"]' );
  let $email = doc.querySelector( '[data-js="email"]' );
  let $salary = doc.querySelector( '[data-js="salary"]' );
  let $skills = doc.querySelectorAll( '[data-js="checkSkills"]' )
    .forEach(function( skill ){
      skill.addEventListener( 'click', addSkill, false );
    }
  );

  let $salaryFilter = doc.querySelector( '[data-js="salaryExpectationFilter"]' );
  let $skillsFilter = doc.getElementById( 'select' );

  let $searchBtn = doc.querySelector( '[data-js="searchBtn"]' ); 
  let $createBtn = doc.querySelector( '[data-js="createBtn"]' );  

  let $form = doc.getElementById( 'form' );

  let skillsList = [];

  function addSkill( e ){
    if ( this.checked ){
      skillsList.push( this.value );
    } else {
      let position = skillsList.indexOf(this.value);
      skillsList.splice(position, 1);
    }
  }

  /**Create */
  
  $createBtn.addEventListener( 'click', addCandidate, false );

  function addCandidate( e ){
    e.preventDefault();
    if ($inputName.value == "" || $email.value == "" || $salary.value == "" 
      || skillsList.length == 0){
        return alert( "Preencha todos os campos." );
    }
    let candidate = {
      fullName: $inputName.value,
      email: $email.value,
      salaryExpectation: $salary.value,
      skills: skillsList
    }
    candidates.push(candidate);
    alert('Candidato cadastrado.');
    $form.reset();    
  }
  
  $skillsFilter.addEventListener('change', function(){
    let index = $skillsFilter.selectedIndex;
  })

  /** Search */
  $searchBtn.addEventListener( 'click', searchApplicant, false );

  let arrFilter = []; // array do filtro solicitado

  function searchApplicant( event ){
    event.preventDefault();
    let selectItems = $skillsFilter.selectedOptions;
    let busca;
    
    Array.prototype.forEach.call( selectItems, function(item){
      arrFilter.push(item.value);
    });

    if ($salaryFilter.value != '' && arrFilter.length != 0){
      //code
    }

    if ($salaryFilter.value == '' && arrFilter.length != 0)
      busca = searchForSkills();

    if ($salaryFilter.value != '' && arrFilter.length == 0)
      busca = searchForSalary();

    if ($salaryFilter.value == '' && arrFilter.length == 0 )
      busca = candidates;

    showInModal(busca);
    $modal.setAttribute('class', "modal collapse show");
    $salaryFilter.value = "";
    arrFilter = [];
  }

  function searchForSalary(){
    let bySalary = candidates.filter( function( item ){
      return item.salaryExpectation <= +$salaryFilter.value;
    });
    return bySalary;
  }

  function searchForSkills(){
    let bySkills;
    arrFilter.forEach( function( item ){
      bySkills = candidates.filter( function(cand){
        return cand.skills.indexOf(item) != -1 ;
      });
    });
    return bySkills;
  };
  
  /** Modal */

  function showInModal( elem ){
    if (elem == undefined || elem.length == 0){
      let $modalElement = doc.createElement('p');
      let $modalText = doc.createTextNode( 
        'Não há resultados para esse filtro.' 
      ); 

      $modalElement.appendChild($modalText);
      $modalBody.appendChild($modalElement);
      return console.error('Sem resultados')
    }
    elem.forEach( function(e){
      let $modalElement = doc.createElement('p');
      let $modalText = doc.createTextNode( e.fullName ); 

      $modalElement.appendChild($modalText);
      $modalBody.appendChild($modalElement);
    });
  }

  $closeModal.addEventListener( 'click', closeModal, false );

  function closeModal( event ){
    event.preventDefault();
    $modal.className = "modal fade";
    $modalBody.innerHTML = "";
  }

  })(document, window);