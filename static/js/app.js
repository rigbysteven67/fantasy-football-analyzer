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

    d3.json('/api/data_table').then(data => {
        
        //  apply filter for season value
        data = data.filter(d => d['Season'] == season);
        data = data.filter(d => d['Position'] == 'QB').slice(0,12);

        var trace1 = {
            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            y: data.map(d => d['Total Fantasy Points']),
            mode: 'markers',
            type: 'bar',
            name: 'Team A',
            text: data.map(d => d['Name']),
            marker: { size: 8 }
          };
          
        var data2 = [trace1];
          
          var layout = {
            xaxis: {
              title: 'Player Ranking',
              range: [ 0.75, 12.75 ]
            },
            yaxis: {
              title: 'Total Points',
              range: [80, 400]
            },
            title:'Total Fantasy Points for QB Rankings',
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)'
          };
          
          Plotly.newPlot('qb_scatter', data2, layout);

    });

     /**********************************/
    // build scatter plot for rb

    d3.json('/api/data_table').then(data => {
        
      //  apply filter for season value
      data = data.filter(d => d['Season'] == season);
      data = data.filter(d => d['Position'] == 'RB').slice(0,30);

      var trace1 = {
          x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
          y: data.map(d => d['Total Fantasy Points']),
          mode: 'markers',
          type: 'bar',
          name: 'Team A',
          text: data.map(d => d['Name']),
          marker: { size: 8 }
        };
        
      var data2 = [trace1];
        
        var layout = {
          xaxis: {
            title: 'Player Ranking',
            range: [ 0.75, 30.75 ]
          },
          yaxis: {
            title: 'Total Points',
            range: [80, 400]
          },
          title:'Total Fantasy Points for RB Rankings',
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)'
        };
        
        Plotly.newPlot('rb_scatter', data2, layout);

  });

     /**********************************/
    // build scatter plot for wr

    d3.json('/api/data_table').then(data => {
        
      //  apply filter for season value
      data = data.filter(d => d['Season'] == season);
      data = data.filter(d => d['Position'] == 'WR').slice(0,30);

      var trace1 = {
          x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
          y: data.map(d => d['Total Fantasy Points']),
          mode: 'markers',
          type: 'bar',
          name: 'Team A',
          text: data.map(d => d['Name']),
          marker: { size: 8 }
        };
        
      var data2 = [trace1];
        
        var layout = {
          xaxis: {
            title: 'Player Ranking',
            range: [ 0.75, 30.75 ]
          },
          yaxis: {
            title: 'Total Points',
            range: [80, 400]
          },
          title:'Total Fantasy Points for WR Rankings',
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)'
        };
          
          Plotly.newPlot('wr_scatter', data2, layout);

    });

     /**********************************/
    // build scatter plot for TE

    d3.json('/api/data_table').then(data => {
        
      //  apply filter for season value
      data = data.filter(d => d['Season'] == season);
      data = data.filter(d => d['Position'] == 'TE').slice(0,30);

      var trace1 = {
          x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          y: data.map(d => d['Total Fantasy Points']),
          mode: 'markers',
          type: 'bar',
          name: 'Team A',
          text: data.map(d => d['Name']),
          marker: { size: 8 }
        };
        
      var data2 = [trace1];
        
        var layout = {
          xaxis: {
            title: 'Player Ranking',
            range: [ 0.75, 12.75 ]
          },
          yaxis: {
            title: 'Total Points',
            range: [80, 400]
          },
          title:'Total Fantasy Points for WR Rankings',
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

      var year1 = document.getElementById("year1");
      filter3 = year1.value;
      console.log(filter3);

      var year2 = document.getElementById("year2");
      filter4 = year2.value;
      console.log(filter4);
  
      // filter data based on player 1 and year 1 inputs

      var filtered_data = data.filter(d => (d['Name'].toUpperCase() == filter1) && (d['Season'] == filter3));

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

      // filter data based on player 2 and year inputs

      var filtered_data2 = data.filter(d2 => (d2['Name'].toUpperCase() == filter2) && (d2['Season'] == filter4));

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


        // make comparison card
        player_cards_div = d3.select('#player-comparison-cards');
        player_cards_div.html('');

          img_div = player_cards_div.append('div');
          img_div.attr('class', 'col-md-12');

            card_div = img_div.append('div');
            card_div.attr('class', 'card mb-3 bg-dark text-white card border-info');

            //card_div.attr('style', 'max-width: 540px;');

                card_row = card_div.append('div');
                card_row.attr('class', 'row no-gutters');
                card_row.attr('style', 'margin: 20px');

                    img1_div = card_row.append('div');
                    img1_div.attr('class', 'col-md-2');
                    //img1_div.attr('style', 'display: table-cell; vertical-align: middle;');
                    img1_div.attr('style', 'display: flex; align-items: center');

                     img1_path = `/static/images/${pos}.png`

                        img1 = img1_div.append('img');
                        img1.attr('src', img1_path);
                        img1.attr('alt', name);
                        img1.attr('id', "imageBox");
                        img1.attr('style', 'max-width: 100%; height: auto;');

                    stats1_div = card_row.append('div');
                    stats1_div.attr('class', 'col-md-2');
                    stats1_div.attr('style', 'line-height: 60%');

                        Object.values(filtered_data[0]).forEach(value => {
                          stats1_div.append('p').text(value);
                        });

                    keys_div = card_row.append('div');
                    keys_div.attr('class', 'col-md-4');
                    keys_div.attr('style', 'line-height: 60%');

                        Object.keys(filtered_data[0]).forEach(key => {
                          keys_div.append('p').text(key);
                        });

                    stats2_div = card_row.append('div');
                    stats2_div.attr('class', 'col-md-2');
                    stats2_div.attr('style', 'line-height: 60%');

                        Object.values(filtered_data2[0]).forEach(value => {
                          stats2_div.append('p').text(value);
                        });

                    img2_div = card_row.append('div');
                    img2_div.attr('class', 'col-md-2');
                    img2_div.attr('style', 'display: flex; align-items: center');

                        img2_path = `/static/images/${pos2}.png`

                        img2 = img2_div.append('img');
                        img2.attr('src', img2_path);
                        img2.attr('alt', name);
                        img2.attr('style', 'max-width: 100%; height: auto;');
      
                  
     
    });

  };  



  
/**********************************/
  // machine learning visualisations 

function populate(pos) {

    console.log(pos)

    

    d3.json('/api/' + pos + '_analysis').then(data => {

      // build scatter plot for usage vs fpts
      
      var trace1 = {
          x: data.map(d => d['Usage/Game']),
          y: data.map(d => d['FantasyPoints/Game']),
          mode: 'markers',
          type: 'scatter',
          name: 'Team A',
          //text: data.map(d => d['name']),
          marker: { size: 8 }
        };
        
      var data2 = [trace1];
        
      var layout = {
        xaxis: {
          title: 'Usage Per Game',
          //range: [ 0.75, 10.75 ]
        },
        yaxis: {
          title: 'Fantasy Points Per Game',
          //range: [80, 400]
        },
        title:'Usage Vs Total Fantasy Points',
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      };
        
        Plotly.newPlot('plt1', data2, layout);


      // build scatter plot for efficiency vs fpts
      
      var trace1 = {
        x: data.map(d => d['TD/Usage']),
        y: data.map(d => d['FantasyPoints/Game']),
        mode: 'markers',
        type: 'scatter',
        name: 'Team A',
        //text: data.map(d => d['name']),
        marker: { size: 8 }
      };
      
      var data2 = [trace1];
        
      var layout = {
        xaxis: {
          title: 'Touchdowns Per Usage',
          //range: [ 0.75, 10.75 ]
        },
        yaxis: {
          title: 'Fantasy Points Per Game',
          //range: [80, 400]
        },
        title:'Efficiency Vs Total Fantasy Points',
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      };
        
        Plotly.newPlot('plt2', data2, layout);


      top10 = data.slice(0,20);


      player_cards_div = d3.select('#player-cards');
      player_cards_div.html('');

      top10.forEach(player => {

        var pic = player['headshot_url'];
        var name = player['Player'];
        var usage_rank = player['UsageRank'];
        var fantasy_rank = player['FantasyPointsRank'];
        var fantasy_points = player['FantasyPoints'];
        var fantasy_prediction = player['FantasyPointPrediction'];

        headshot_div = player_cards_div.append('div');
        headshot_div.attr('class', 'col-md-6');
        //headshot_img = headshot_div.append('img');
        //headshot_img.attr('src', pic);


        card_div = headshot_div.append('div');
        card_div.attr('class', 'card mb-3 bg-dark text-white card border-info');
        card_div.attr('style', 'max-width: 540px;');

        card_row = card_div.append('div');
        card_row.attr('class', 'row no-gutters');

        headshot_div = card_row.append('div');
        headshot_div.attr('class', 'col-md-4');

        headshot_img = headshot_div.append('img');
        headshot_img.attr('src', pic);
        headshot_img.attr('alt', name);
        headshot_img.attr('style', 'max-width: 100%; height: auto; position: absolute; bottom:0;');

        stats_div = card_row.append('div');
        stats_div.attr('class', 'col-md-8');

        card_body_div = stats_div.append('div');
        card_body_div.attr('class', 'card-body');
        
        card_body_div.append('h5').text(name);
        card_body_div.append('p').text(`Rank: ${usage_rank}`);
        card_body_div.append('p').text(`Points: ${fantasy_points}`);
        card_body_div.append('p').text(`Prediction: ${fantasy_prediction}`);

      });

    });


};


    /**********************************/
    // build table for predictions



    d3.json('/api/predictions').then(data => {
    
      //  apply filter for season value
      //data = data.filter(d => d['season'] == season);

      // populate table
      table = d3.select('#predTable');

      // populate thead
      thead = d3.select('#thead');

      Object.keys(data[0]).forEach(key => {
          var th = thead.append('th');
          th.text(key);
      });

      data.forEach(stats => {
          
      // populate tbody
          tbody = d3.select('#tbody')
          var tr = tbody.append("tr");
                  
          Object.values(stats).forEach(value => {
              var td = tr.append("td");
              td.text(value);
          });
      });


      



    }); 



/******* Activate the MDBootstrap thing */

setTimeout(function(){
  $('#predTable').DataTable();
  $('.dataTables_length').addClass('bs-select');
}, 10000); 