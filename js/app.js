var LastSeenComponent = React.createClass({
  getInitialState: function() {
    return {data: 'Unknown'};
  },
  getLocation: function() {
    console.log("Fetching location...");
    this.setState({
      data: "Fetching location..."
    });
    var setLocation =  this.setLocationState;
    $.ajax({
      url: 'https://otgqnsn74l.execute-api.us-east-1.amazonaws.com/prod/Locator',
      success: function(result) {
        if (result.meta.status == 200) {
          setLocation(result);
        }
      },
      error: function(error) {
        console.log("Error: " + JSON.stringify(error));
        setLocation({
          "where": {
              "code": "XX",
          }
        });
      }
    });
  },
  componentDidMount: function() {
      // Do this when we mount this component
      this.getLocation();
  },
  setLocationState: function(location) {
    var countrycode = location.where.code;
    var location_string = "";
    if (countrycode != "XX") {
      if (location.where.city != undefined) {
        location_string = location.where.city + ", ";
      }
      location_string = location_string + location.where.country;
      if (location.where.lastseen_timestamp != undefined) {
        var currentTime =  Math.floor(new Date().getTime() / 1000);
        var TimeDiff = currentTime - parseInt(location.where.lastseen_timestamp);
        if (TimeDiff < 259200) { // Less than 3 days
          location_string = location_string + " " + moment.unix(parseInt(location.where.lastseen_timestamp)).fromNow();
        } else {
          location_string = location_string;
        }
      }
      var timestamp = location.where.lastseen_timestamp;

      this.setState({
        data: location_string
      });
    } else {
      this.setState({
        data: "Error fetching location"
      });
    }
  },
  render: function() {
    return (
      <p>
        <i className="fa fa-location-arrow"></i> Last Seen: {this.state.data}
      </p>
    );
  }
});

var igapp = igapp || {};
var RecentInstagramComponent =  React.createClass({
  getInitialState: function() {
    return {string: "", recent_instagrams: []};
  },
  getRecentInstagrams: function() {
    console.log("Fetching Recent Instagrams...");
    this.setState({
      string: "Fetching recent instagrams...",
      recent_instagrams: []
    });
    var processInstagrams =  this.processInstagrams;
    $.ajax({
      url: 'https://31w5zsytgl.execute-api.us-east-1.amazonaws.com/1/recent_instagrams',
      success: function(result) {
        var responseToProcess = {"message": result.message};
        if (result['recent_instagrams'] !== undefined) responseToProcess['recent_instagrams'] = result['recent_instagrams'];
        processInstagrams(responseToProcess);
      },
      error: function(error) {
        processInstagrams({"message": "error", "error": error});
      }
    });
  },
  processInstagrams: function(response) {
    var outputResponse = {
      string: "loaded",
      recent_instagrams: []
    };

    if (response['message'] !== "error") {
      var recent_instagrams = response['recent_instagrams'];
      var processed_recent_instagrams = [];
      if (recent_instagrams.length > 6) {
        for (var i = 0; i < 6; i++) {
          var recent_instagram = recent_instagrams[i];
          if (recent_instagram.link !== undefined && recent_instagram.caption !== undefined && recent_instagram.images !== undefined && recent_instagram.location !== undefined) {
            if (recent_instagram.caption.text !== undefined && recent_instagram.images.standard_resolution !== undefined && recent_instagram.images.thumbnail !== undefined && recent_instagram.location.latitude !== undefined && recent_instagram.location.longitude !== undefined) {
              if (recent_instagram.images.standard_resolution['url'] !== undefined && recent_instagram.images.thumbnail['url'] !== undefined) {
                var igobj_to_push = {
                  href: recent_instagram.link,
                  caption: recent_instagram.caption.text,
                  thumbnail: recent_instagram.images.thumbnail['url'],
                  image: recent_instagram.images.standard_resolution['url']
                };
                if (recent_instagram.location !== undefined) {
                  if (recent_instagram.location !== null) {
                    if (recent_instagram.location.latitude !== undefined) {
                      if (recent_instagram.location.latitude !== null) {
                        igobj_to_push.location = [recent_instagram.location.latitude, recent_instagram.location.longitude];
                      }
                    }
                  }
                }; // Check for nulls cause it sometimes fucks up the code
                processed_recent_instagrams.push(igobj_to_push);
              }
            }
          }
        }
      }
      outputResponse['recent_instagrams'] = processed_recent_instagrams;
      outputResponse['string'] = "Loaded";
    } else {
      outputResponse['recent_instagrams'] = [];
      outputResponse['string'] = "Error loading recent instagrams";
    };
    this.setState(outputResponse);
  },
  componentDidMount: function() {
      // Do this when we mount this component
      this.getRecentInstagrams()
  },
  render: function() {
    if (this.state.recent_instagrams.length > 0) {
      var recent_instagram_array = this.state.recent_instagrams.map((instagram) => {
        return (
          <a href={instagram.href} target="newwinimage"><img src={instagram.thumbnail} alt={instagram.caption} key={instagram.id}/></a>
        )
      });

      return (
        <p>
          <h3>Recent Instagrams</h3>
          {recent_instagram_array}
          <br />
          follow <a href="https://instagram.com/nolim1t" target="followmeinstagram"><strong>@nolim1t</strong></a> for more
        </p>
      );
    } else {
      return (
        <p>
        {this.state.string}
        </p>
      );
    }
  }
});

ReactDOM.render(
  <LastSeenComponent />,
  document.getElementById("lastseen")
);

// Recent Instagrams
ReactDOM.render(
  <RecentInstagramComponent />,
  document.getElementById("recentinstagrams")
);
