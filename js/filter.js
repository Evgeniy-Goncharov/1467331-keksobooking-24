const mapFilters = document.querySelector('.map__filters');
const featuresFilter = mapFilters.querySelector('.map__features');

function disableFilter() {
  const mapFiltersElements = mapFilters.querySelectorAll('.map__filter');
  const mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');

  mapFilters.classList.add('map__filters--disabled');

  mapFiltersElements.forEach((element) => element.disabled = true);
  mapFiltersFieldsets.forEach((element) => element.disabled = true);
}

function enableFilter() {
  const mapFiltersElements = mapFilters.querySelectorAll('.map__filter');
  const mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');

  mapFilters.classList.remove('map__filters--disabled');

  mapFiltersElements.forEach((element) => element.disabled = false);
  mapFiltersFieldsets.forEach((element) => element.disabled = false);
}

function clearFilter () {
  mapFilters.reset();
}

function isFilter (value) {
  return value === 'any';
}

const filterOffers = (offers) => {
  const typeSelect = mapFilters.querySelector('#housing-type');
  const priceSelect = mapFilters.querySelector('#housing-price');
  const roomsSelect = mapFilters.querySelector('#housing-rooms');
  const guestsSelect = mapFilters.querySelector('#housing-guests');
  let filteredOffers = offers.slice();

  function filterData (value, cb) {
    if (!isFilter(value)) {
      return filteredOffers.filter(cb);
    }
    return filteredOffers;
  }

  function filterOnType ({offer}) {
    return offer.type === typeSelect.value;
  }

  function filterOnPrice ({offer}) {
    switch(priceSelect.value) {
      case 'middle': return 10000 < offer.price && offer.price < 50000;
      case 'low': return offer.price < 10000;
      case 'high': return 50000 < offer.price;
    }
  }

  function filterOnRooms ({offer}) {
    return Number(roomsSelect.value) === Number(offer.rooms);
  }

  function filterOnGuests ({offer}) {
    const value = Number(guestsSelect.value);
    const guests = Number(offer.guests);
    if(value !== 0) {
      return guests <= value;
    } else {
      return guests > 3;
    }
  }

  filteredOffers = filterData(typeSelect.value, filterOnType);
  filteredOffers = filterData(priceSelect.value, filterOnPrice);
  filteredOffers = filterData(roomsSelect.value, filterOnRooms);
  filteredOffers = filterData(guestsSelect.value, filterOnGuests);

  return filteredOffers;
};

function sortOffersByRank (offers) {
  const checkedFeatures = [];

  function isCheckedFeature (offerFeature) {
    return checkedFeatures.some((checkedFeature) => offerFeature === checkedFeature);
  }

  function getCheckedFeatures () {
    const featureInputs = featuresFilter.querySelectorAll('[type="checkbox"]');

    for (const input of featureInputs) {
      if (input.checked) {
        checkedFeatures.push(input.value);
      }
    }
  }

  function getOfferRank ({offer}) {
    const {features} = offer;
    let rank = 0;

    if (features) {
      offer.features.forEach((offerFeature) => {
        if (isCheckedFeature(offerFeature)) {
          rank++;
        }
      });
    }

    return rank;
  }

  getCheckedFeatures();
  offers.sort((a, b) => getOfferRank(b) - getOfferRank(a));
}

function getFilteredSortedoffers (offers) {
  const filteredOffers = filterOffers(offers);
  sortOffersByRank(filteredOffers);
  return filteredOffers;
}

function setFilterClick (offers, cb) {
  mapFilters.addEventListener('change', () => {
    cb(getFilteredSortedoffers(offers));
  });
}

export { disableFilter, enableFilter, clearFilter, setFilterClick };
