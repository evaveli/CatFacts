    function show() {
      const list = document.getElementById('list');
      const empty = document.getElementById('empty');
      list.innerHTML = '';
      empty.style.display = 'none';

      if (facts.length === 0) {
        empty.style.display = 'block';
      } else {
        facts.forEach((fact, i) => {
          const item = document.createElement('li');
          item.textContent = fact.fact;
          item.addEventListener('click', () => {
            detailsPage(i);
          });

          list.appendChild(item);
        });
      }
    }

     function fetchCats() {
          fetch('https://catfact.ninja/facts')
            .then(response => response.json())
            .then(data => {
              facts = data.data;
              show();
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }

let current = -1;

    function search() {
      const input = document.getElementById('search');
      const element = input.value.toLowerCase();
      const list = document.getElementById('list');
      const empty = document.getElementById('empty');
      let filtered = facts.filter(fact => fact.fact.toLowerCase().includes(element));

      list.innerHTML = '';
      empty.style.display = 'none';
      if (filtered.length === 0) {
        empty.style.display = 'block';
      } else {
        filtered.forEach((fact, i) => {
          const item = document.createElement('li');
          item.textContent = fact.fact;
          item.addEventListener('click', () => {
            detailsPage(i);
          });
          list.appendChild(item);
        });
      }
    }

    let facts = [];
    function detailsPage(i) {
      current = i;
      const list = document.getElementById('list');
      const detailPage = document.getElementById('details');
      list.style.display = 'none';
      detailPage.style.display = 'block';
      const details = document.getElementById('fact');
      details.textContent = facts[i].fact;

      const back = document.getElementById('back');
      back.addEventListener('click', listPage);
      const deleteB = document.getElementById('delete');
      deleteB.addEventListener('click', factDeletion);
    }
    
    document.addEventListener('DOMContentLoaded', () => {
      fetchCats();
    });
    
    const input = document.getElementById('search');
    input.addEventListener('input', search);

    function listPage() {
      current = -1;
      const list = document.getElementById('list');
      const detailPage = document.getElementById('details');
      list.style.display = 'block';
      detailPage.style.display = 'none';
    }
    
    function factDeletion() {
      if (current >= 0) {
        const confirmation = confirm('This fact is going to be deleted...');
        if (confirmation) {
          facts.splice(current, 1);
          listPage();
          show();
        }
      }
    }

    