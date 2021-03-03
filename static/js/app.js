/**********************************/
// Initialize the visualizatio

d3.json('/api/data_table').then(data => {
    // grab a reference to the dropdown select element
    var selector = d3.select('#selDataset');

    allYears = data.map(d => d['Season']);

    years = [...new Set(allYears)];

    years.sort((a,b) => (b-a));

    years.forEach(year => {
        selector
            .append('option')
            .property('value', year)
            .text(year);
    });

    //use the first sample from the list to build the initial plots
    var firstSample = years[0];

    buildCharts(firstSample);


});



/**********************************/
// buildCharts function

function buildCharts(season) {


    /**********************************/
    // build leaderboard table

    d3.json('/api/data_table').then(data => {
      //var Tablehead = document.getElementById("stats-thead");
      //  Tablehead.innerHTML = "";
      var tbody = d3.select('#stats-tbody');
      $('#stats-tbody').empty();
        
        //  apply filter for season value
        data = data.filter(d => d['Season'] == season);

        // populate thead
        /* THIS IS HANDLED IN INDEX.HTML
        thead = d3.select('#stats-thead');

        Object.keys(data[0]).forEach(key => {
            var th = thead.append('th');
            th.text(key);
        });
        */

        data.forEach(stats => {
            
        // populate tbody
            var tr = tbody.append("tr");
                    
            Object.values(stats).forEach(value => {
                var td = tr.append("td");
                td.text(value);
            });
        });

        /******* Destroy the MDBootstrap thing */
        var table = $('#myTable').DataTable();
 
        $('#selDataset').on( 'change', function () {
            table.destroy();
        } );

        /******* Activate the MDBootstrap thing */
        $('#myTable').DataTable();
        $('.dataTables_length').addClass('bs-select');
        


        
    });

    /**********************************/
    // build scatter plot for qb

    d3.json('/api/pos_rank').then(data => {
        
        //  apply filter for season value
        data = data.filter(d => d['season'] == season);
        data = data.filter(d => d['pos'] == 'QB').slice(0,10);

        var trace1 = {
            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            y: data.map(d => d['Total FPTS']),
            mode: 'markers',
            type: 'scatter',
            name: 'Team A',
            text: data.map(d => d['name']),
            marker: { size: 8 }
          };
          
        var data2 = [trace1];
          
          var layout = {
            xaxis: {
              title: 'Player Ranking',
              range: [ 0.75, 10.75 ]
            },
            yaxis: {
              title: 'Total Points',
              range: [80, 400]
            },
            title:'FPTS for QB Rankings',
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)'
          };
          
          Plotly.newPlot('qb_scatter', data2, layout);

    });

     /**********************************/
    // build scatter plot for rb

    d3.json('/api/pos_rank').then(data => {
        
        //  apply filter for season value
        data = data.filter(d => d['season'] == season);
        data = data.filter(d => d['pos'] == 'RB').slice(0,10);

        var trace1 = {
            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            y: data.map(d => d['Total FPTS']),
            mode: 'markers',
            type: 'scatter',
            name: 'Team A',
            text: data.map(d => d['name']),
            marker: { size: 8 }
          };
          
        var data2 = [trace1];
          
        var layout = {
          xaxis: {
            title: 'Player Ranking',
            range: [ 0.75, 10.75 ]
          },
          yaxis: {
            title: 'Total Points',
            range: [80, 400]
          },
          title:'FPTS for RB Rankings',
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)'
        };
          
          Plotly.newPlot('rb_scatter', data2, layout);

    });

     /**********************************/
    // build scatter plot for wr

    d3.json('/api/pos_rank').then(data => {
        
        //  apply filter for season value
        data = data.filter(d => d['season'] == season);
        data = data.filter(d => d['pos'] == 'WR').slice(0,10);
        
        var trace1 = {
            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            y: data.map(d => d['Total FPTS']),
            mode: 'markers',
            type: 'scatter',
            name: 'Team A',
            text: data.map(d => d['name']),
            marker: { size: 8 }
          };
          
        var data2 = [trace1];
          
        var layout = {
          xaxis: {
            title: 'Player Ranking',
            range: [ 0.75, 10.75 ]
          },
          yaxis: {
            title: 'Total Points',
            range: [80, 400]
          },
          title:'FPTS for WR Rankings',
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)'
        };
          
          Plotly.newPlot('wr_scatter', data2, layout);

    });

     /**********************************/
    // build scatter plot for TE

    d3.json('/api/pos_rank').then(data => {
        
        //  apply filter for season value
        data = data.filter(d => d['season'] == season);
        data = data.filter(d => d['pos'] == 'TE').slice(0,10);

        var trace1 = {
            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            y: data.map(d => d['Total FPTS']),
            mode: 'markers',
            type: 'scatter',
            name: 'Team A',
            text: data.map(d => d['name']),
            marker: { size: 8 }
          };

        var data2 = [trace1];
          
        var layout = {
          xaxis: {
            title: 'Player Ranking',
            range: [ 0.75, 10.75 ]
          },
          yaxis: {
            title: 'Total Points',
            range: [80, 400]
          },
          title:'FPTS for TE Rankings',
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)'
        };
          
          Plotly.newPlot('te_scatter', data2, layout);

    });

    /**********************************/
    // build line plot for FPTs / g over seasons

    d3.json('/api/FPTS_over_seasons').then(data => {
        
        // //  apply filter for season value
        // data = data.filter(d => d['season'] == season);

        var trace1 = {
            x: data.filter(d => d['pos'] == 'QB').map(d => d['season']),
            y: data.filter(d => d['pos'] == 'QB').map(d => d['FPTS/G']),
            mode: 'lines',
            name: 'QB'
          };
          
          var trace2 = {
            x: data.filter(d => d['pos'] == 'RB').map(d => d['season']),
            y: data.filter(d => d['pos'] == 'RB').map(d => d['FPTS/G']),
            mode: 'lines',
            name: 'RB'
          };

          var trace3 = {
            x: data.filter(d => d['pos'] == 'WR').map(d => d['season']),
            y: data.filter(d => d['pos'] == 'WR').map(d => d['FPTS/G']),
            mode: 'lines',
            name: 'WR'
          };

          var trace4 = {
            x: data.filter(d => d['pos'] == 'TE').map(d => d['season']),
            y: data.filter(d => d['pos'] == 'TE').map(d => d['FPTS/G']),
            mode: 'lines',
            name: 'TE'
          };

          var layout = {
            xaxis: {
              title: 'YEARS'
            },
            yaxis: {
              title: 'Avg Points'
            },
            title:'Avg Fantasy Points per Game by Position',
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)'
          };
          
          var data2 = [trace1, trace2, trace3, trace4];
        
          
        Plotly.newPlot('avg_fpts_line', data2, layout);

    });


    /**********************************/
    // build line plot for # of pos over seasons

    d3.json('/api/num_of_pos_over_over_seasons').then(data => {
        
        // //  apply filter for season value
        // data = data.filter(d => d['season'] == season);

        var trace1 = {
            x: data.map(d => d['season']),
            y: data.map(d => d['QB']),
            mode: 'lines',
            name: 'QB'
          };
          
          var trace2 = {
            x: data.map(d => d['season']),
            y: data.map(d => d['RB']),
            mode: 'lines',
            name: 'RB'
          };

          var trace3 = {
            x: data.map(d => d['season']),
            y: data.map(d => d['WR']),
            mode: 'lines',
            name: 'WR'
          };

          var trace4 = {
            x: data.map(d => d['season']),
            y: data.map(d => d['TE']),
            mode: 'lines',
            name: 'TE'
          };

          var layout = {
            xaxis: {
              title: 'YEARS'
            },
            yaxis: {
              title: '# of Players'
            },
            title:'Number of Top 300 Fantasy Players by Position',
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)'
          };
          
          var data2 = [trace1, trace2, trace3, trace4];
        
          
        Plotly.newPlot('pos_count_line', data2, layout);

    });

    /**********************************/
    // build table for # of pos over seasons



    d3.json('/api/num_of_pos_over_over_seasons').then(data => {
    
        //  apply filter for season value
        //data = data.filter(d => d['season'] == season);

        // populate table
        //table = d3.select('#myTable');

        // populate thead
        thead = d3.select('#count-thead');

        Object.keys(data[0]).forEach(key => {
            var th = thead.append('th');
            th.text(key);
        });

        data.forEach(stats => {
            
        // populate tbody
            tbody = d3.select('#count-tbody')
            var tr = tbody.append("tr");
                    
            Object.values(stats).forEach(value => {
                var td = tr.append("td");
                td.text(value);
            });
        });
    });

    

};


function optionChanged(newSample) {
    buildCharts(newSample);   
    
    $('#myTable').DataTable();
        $('.dataTables_length').addClass('bs-select');
};



/**********************************/
    // build comparison table


function playerComparison() {
  
    d3.json('/api/data_table').then(data => {

      console.log(data)

      // assign form inputs to variable

      var player1 = document.getElementById("player1");
      filter1 = player1.value.toUpperCase();
      console.log(filter1);

      var player2 = document.getElementById("player2");
      filter2 = player2.value.toUpperCase();
      console.log(filter2);

      var year = document.getElementById("year");
      filter3 = year.value;
      console.log(filter3);
  
      // filter data based on player 1 and year inputs

      var filtered_data = data.filter(d => (d['Name'].toUpperCase() == filter1) && (d['Season'] == filter3));
      console.log(filtered_data)

      // assign pos variable for img1

      if (filtered_data[0]['Position'] == 'QB') {
        var pos = 'qb'
      }
      else if (filtered_data[0]['Position'] == 'RB') {
        var pos = 'rb'
      }
      else if (filtered_data[0]['Position'] == 'WR') {
        var pos = 'wr'
      }
      else if (filtered_data[0]['Position'] == 'TE') {
        var pos = 'te'
      }

      console.log(pos)

      document.getElementById('img1').innerHTML = '<img src="static/images/' + pos + '.png?anyValueHere" id="imageBox"/>';

      // populate categorylist  

      categorylist = d3.select('#categorylist');
      $('#categorylist').empty();

        Object.keys(filtered_data[0]).forEach(key => {
            var li = categorylist.append('li');
            li.text(key);
        });

      // populate player1list

      player1list = d3.select('#player1list');
      $('#player1list').empty();

        Object.values(filtered_data[0]).forEach(value => {
            var li = player1list.append('li');
            li.text(value);
        });



      console.log(data)

      // filter data based on player 2 and year inputs

      var filtered_data2 = data.filter(d => (d['Name'].toUpperCase() == filter2) && (d['Season'] == filter3));
      console.log(filtered_data2)

      // assign pos variable for img2

      if (filtered_data2[0]['Position'] == 'QB') {
        var pos2 = 'qb'
      }
      else if (filtered_data2[0]['Position'] == 'RB') {
        var pos2 = 'rb'
      }
      else if (filtered_data2[0]['Position'] == 'WR') {
        var pos2 = 'wr'
      }
      else if (filtered_data2[0]['Position'] == 'TE') {
        var pos2 = 'te'
      }

      console.log(pos2)

      document.getElementById('img2').innerHTML = '<img src="static/images/' + pos2 + '.png?anyValueHere" id="imageBox"/>';

        // populate player2list

        player2list = d3.select('#player2list');
        $('#player2list').empty();

        Object.values(filtered_data2[0]).forEach(value => {
            var li = player2list.append('li');
            li.text(value);
        });
     
    });

  };  

