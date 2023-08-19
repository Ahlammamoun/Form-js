const utils = {
    /**
     * Méthode permettant de vérifier les données saisies dans un fieldset (étape d'inscription)
     * @param {HTMLElement} fieldsetElement
     * @returns {boolean} true si les valeurs ont ok, false sinon
     */
    checkFieldset: function(fieldsetElement) {
      let isOk = true;
      console.log("Check de l'étape :" + app.stepNumber);
  
      switch(app.stepNumber) {
        case 1 : {
          
          // si un des 4 est faux isOk = false
          let genderOk = utils.checkFieldSelect('gender', 'La civilité doit etre selectionnée');
          let nameOk = utils.checkFieldInputText('lastname', 'Le nom doit faire au moins 2 caractères', 2);
          let firstNameOk = utils.checkFieldInputText('firstname', 'Le prénom doit faire au moins 2 caractères', 2);
          let emailOk = utils.checkFieldInputText('email', 'L\'email doit faire au moins 2 caractères', 2);
  
          if ((!genderOk) || (!nameOk) || (!firstNameOk) ||(!emailOk) ) {
            isOk = false;
          }
  
          break;
        }
        case 2 : {
          // si un des 4 est faux isOk = false
          let addrOk = utils.checkFieldInputText('addr1', 'L adresse doit faire au moins 2 caractères', 2);
          let cpOk = utils.checkFieldInputText('cp', 'Le CP doit faire au moins 2 caractères', 2);
          let cityOk = utils.checkFieldInputText('city', 'La ville doit faire au moins 2 caractères', 2);
  
          if ((!addrOk) || (!cpOk) || (!cityOk)) {
            isOk = false;
          }
          break;
        }
        case 3 : {
          let courseOk = utils.checkFieldSelect('courses', 'La civilité doit etre selectionnée');
          let statusOk = utils.checkFieldSelect('status', 'La civilité doit etre selectionnée');
          if ((!courseOk) || (!statusOk)) {
            isOk = false;
          }
          break;
        }
      }
  
      // checker les champs de formulaire de fieldsetElement
      return isOk;
    },
  
  
  
    /**
     * Méthode permettant de vérifier un champ de type <select>
     * @param {string} fieldId
     * @param {string} textError
     * @return {boolean} // true si le select est OK
     */
    checkFieldSelect: function(fieldId, textError) {
      let isOk = true;
      // on recupere le select à verifier grace a son id 
      const selectElement = document.getElementById(fieldId);
  
      // on va verifier si il y a bien une valeur selectionnée qui n'est pas 0
      const value = Number(selectElement.value);
      console.log("value du select : " + value);
  
      if (value === 0) {
  
        isOk = false;
        console.log("il n'y a pas de valeur selectionné");
  
        // on cherche le div parent de l'input avec closest
        const divParent = selectElement.closest('.form-group');
        console.log(divParent);
        // on lui met la class erreur 
        divParent.classList.add('form-group--error');
  
        // et on met la class form-group--error sur le div parent
        const divTextError = divParent.querySelector('.form-group__error');
        divTextError.textContent = textError;
      }
      else {
        // il y a bien une valeur selectionné
        // on veux recuperer le champ recap correspondant au select qu'on est en train de verifier 
        // rempli le recap
        const recapElementARemplir = document.getElementById('recap-'+ fieldId);
        recapElementARemplir.textContent = selectElement.options[value].innerText;
      }
  
      return isOk;
    },
  
  
  
  
    /**
     * Méthode permettant de vérifier un champ de type <input type="text">
     * @param {string} fieldId
     * @param {string} textError
     * @param {number} minLength
     * @returns {boolean} // true si le input text est ok
     */
    checkFieldInputText: function(fieldId, textError, minLength) {
      let isOk = true;
  
      // on recupere le input text à checker grace à l'id
      const inpuTextElement = document.getElementById(fieldId);
      //console.log("check de l'input text : ", inpuTextElement)
      
      const value = inpuTextElement.value.trim();
  
      if (value.length < minLength) {
        // pas assez de caractères !!!
        isOk = false;
  
        // on cherche le div parent de l'input avec closest
        const divParent = inpuTextElement.closest('.form-group');
  
        // on lui met la class erreur 
        divParent.classList.add('form-group--error');
  
        // et on met la class form-group--error sur le div parent
        const divTextError = divParent.querySelector('.form-group__error');
        divTextError.textContent = textError;
      }
      else {
        // on cherche le div parent de l'input avec closest
        const divParent = inpuTextElement.closest('.form-group');
  
        // on lui enleve la class erreur 
        divParent.classList.remove('form-group--error');
  
        // on veux recuperer le champ recap orrespondant à l'input text qu'on est en train de verifier 
        // rempli le recap
        const recapElementARemplir = document.getElementById('recap-'+ fieldId);
        recapElementARemplir.textContent = value;
      }
      
      // checker le input text fieldId
      return isOk;
    }
  };
  