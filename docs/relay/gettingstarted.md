---
id: gettingstarted
title: Getting started with relay
---

Most of what need you will find on <a href="https://relay.dev" rel="noopener noreferrer" target="_blank">relay.dev</a>

If you are looking for some concrete example you can check out  <a href="https://github.com/adeira/relay-example" rel="noopener noreferrer" target="_blank">Adeira relay-example</a>

This is a repo that contains some basic examples of pagination, fragment composition and mutation configs. You will also find some videos explaining the different examples.

## Relay compiler

One of the things that separates relay from apollo client is that relay uses a compiler to validate the queries ahead of time. I know that for someone this is considered an obstacle to get started with relay. But I would say that when you get familiar with relay, this is really a big benefit because it tells you at compile time if your query is valid or not. It is like using static type checking vs `prop-types`. 

## Fragment composition

When you are new to relay, one of the things you need to master is fragment composition. When you start to understand it, you know that relay is a really powerful tool. Think about this example: 

```jsx

const FromTo = ({ itinerary }) => {
  return (
    <div>
      <div>{itinerary.origin.station.name}-{itinerary.origin.station.country}</div>
      <div>{itinerary.destination.station.name}-{itinerary.destination.station.country}</div>
    </div>
  )
}

export default createFragmentContainer(FromTo, {
  itinerary: graphql`
    fragment FromTo_itinerary on Itinerary {
      origin {
        station {
          name
          country
        }
      }
      destination {
        station {
          name
          country
        }
      }
    }
`
})
```

as you can see, there is duplication in code, so you might think how to improve it and end up with something like: 

```jsx
const NameAndCountry = ({ name, country }) => (
   <div>{name}-{country}</div>
)
const FromTo = ({ itinerary }) => {
  return (
    <div>
      <NameAndCountry name={itinerary.origin.station.name} country={itinerary.origin.station.country}/>
      <NameAndCountry name={itinerary.destination.station.name} country={itinerary.destination.station.country}/>
    </div>
  )
}

export default createFragmentContainer(FromTo, {
  itinerary: graphql`
    fragment FromTo_itinerary on Itinerary {
      origin {
        station {
          name
          country
        }
      }
      destination {
        station {
          name
          country
        }
      }
    }
`
})
```

Though this is better we are not quite there yet. There is still some duplication in the fragment. Let's remove also the duplication in the fragment: 

```jsx
// NameAndCountry.js
const NameAndCountry = ({ station }) => (
   <div>{station.name}-{station.country}</div>
);

export default createFragmentContainer(NameAndCountry, {
  station: graphql`
  fragment NameAndCountry_station on Station {
      name
      country
  }
`
})

// FromTo.js
const FromTo = ({ itinerary }) => {
  return (
    <div>
      <NameAndCountry station={itinerary.origin.station} />
      <NameAndCountry station={itinerary.destination.station} />
    </div>
  )
}

export default createFragmentContainer(FromTo, {
  itinerary: graphql`
    fragment FromTo_itinerary on Itinerary {
      origin {
        station {
          ...NameAndCountry_station
        }
      }
      destination {
        station {
          ...NameAndCountry_station
        }
      }
    }
`
})
```

Now we have removed the duplication of the fragment and the code. The good thing now, is that we can add the `NameAndCountry` component anywhere and just spread its fragment, and the data fetching requirements of the query are automatically updated. 

Now that you tie the data fetching requirement of each component to the component it self, you never need to worry again if you can remove this field from your reducer or not.

## You don't need a graphql server to start using relay

Note that you do not need a graphql server to start using relay. Skip to the next section to see how you can start using relay without a graphql server.
