(function(doc, win){
  'use strict';

  let candidates = [
    { 
      fullName: 'João Batista da Silva',
      email: 'jbatista@gmail.com',
      salaryExpectation: 2200,
      skills: [ 'JavaScript', 'CSS', 'HTML', 'Linux' ]
    },
    { 
      fullName: 'Matheus Silva Ferreira',
      email: 'msilva@gmail.com',
      salaryExpectation: 3500,
      skills: [ 'Java', 'JavaScript', 'Gestão', 'PHP', 'Linux', 'Photoshop', 
        'C++', 'Gestão' ]
    },
    { 
      fullName: 'Ana Beatriz Vasconcelos',
      email: 'abeatriz@gmail.com',
      salaryExpectation: 1000,
      skills: [ 'HTML' ]
    },
    { 
      fullName: 'Marcos Sousa Abreu',
      email: 'msousa@gmail.com',
      salaryExpectation: 1900,
      skills: [ 'HTML', 'CSS', 'JavaScript', 'Linux' ]
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
  let $fragmentCandidate = doc.createDocumentFragment();
  let $fragmentCandidateInfo = doc.createDocumentFragment();

  let skillsList = [];

  /**Skills checkbox */
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
    if ( $email.value.match( /\w.+?@\w+.\w\w+(?:.\w\w)?/g ) === null ){
      return alert( "Digite um e-mail válido." )
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

  /** Search */
  $searchBtn.addEventListener( 'click', searchApplicant, false );

  let arrFilter = []; // Array from HTMLCollection (select)

  function searchApplicant( event ){
    event.preventDefault();
    let selectItems = $skillsFilter.selectedOptions;
    let busca;
    
    Array.prototype.forEach.call( selectItems, function(item){
      arrFilter.push(item.value);
    });

    if ($salaryFilter.value != '' && arrFilter.length != 0){
      busca = searchBoth();
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

  /**Search functions */
  function searchBoth(){
    let bySkills = searchForSkills();
    console.log(bySkills)
    let fullSearch = bySkills.filter( function( cand ){
        return cand.salaryExpectation <= +$salaryFilter.value;
      });
    console.log(fullSearch);
    return fullSearch;
  }

  function searchForSalary(){
    let bySalary = candidates.filter( function( cand ){
      return cand.salaryExpectation <= +$salaryFilter.value;
    });
    console.log(bySalary);
    return bySalary;
  }

  function searchForSkills(){
    let bySkills = candidates.filter( function( cand ){ 
      return arrFilter.every( (skill, index, array) => 
        cand.skills.indexOf( skill ) != -1 )
    });
    console.log(bySkills);
    return (bySkills);
  }
  
  /** Modal */

  function showInModal( elem ){
    /** Result is empty */
    if (elem == undefined || elem.length == 0){
      let $modalElement = doc.createElement('p');
      let $modalText = doc.createTextNode( 
        'Não há resultados para esse filtro.' 
      ); 
      $modalElement.appendChild($modalText);
      $modalBody.appendChild($modalElement);
      return 
    }
    /** Return results table */
    let $table = doc.createElement('table');
    $table.setAttribute('class', 'table d-flex column start')
    elem.forEach( function(e){
      let $tr1 = doc.createElement('row');
      let $td = doc.createElement('td');
      let $link = doc.createElement('a');
      let $modalText = doc.createTextNode( e.fullName ); 

      $link.setAttribute('href', '#');

      $link.appendChild($modalText);
      $td.appendChild($link);
      $tr1.appendChild($td);
      $table.appendChild($tr1);
      $fragmentCandidate.appendChild($table);

      $modalBody.appendChild($fragmentCandidate);

      /**Event for candidate link */
      $link.addEventListener('click', function addInfo(){
        let $tr = doc.createElement('row');
        let $tdEmail = doc.createElement('td');
        let $tdSalary = doc.createElement('td');
        let $tdSkills = doc.createElement('td');
        let $dEmail = doc.createTextNode( e.email );
        let $dSalary = doc.createTextNode( e.salaryExpectation );
        let $dSkills = doc.createTextNode( e.skills.join(', ') );

        $tdSkills.appendChild($dSkills);
        $tdSalary.appendChild($dSalary);
        $tdEmail.appendChild($dEmail);
        $tr.appendChild($tdEmail);
        $tr.appendChild($tdSalary);
        $tr.appendChild($tdSkills);
        $fragmentCandidateInfo.appendChild($tr);

        $tr1.appendChild($fragmentCandidateInfo);

        $link.setAttribute('class', 'h6 text-primary');
        $link.removeEventListener('click', addInfo);
      }, false);

    });
  }

  /**close button from table */
  $closeModal.addEventListener( 'click', closeModal, false );

  function closeModal( event ){
    event.preventDefault();
    $modal.className = "modal fade";
    $modalBody.innerHTML = "";
  }

  })(document, window);