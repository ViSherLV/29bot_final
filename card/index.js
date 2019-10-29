/*
{
  "call_card_id": "ER-2019-06-02-000044",
  "responder_id": "FR-30-000010",
  "region": "Тустова МІС",
  "caller_number": "+380638893675",
  "start_datetime": "2019-06-03T19:14:39",
  "patient": {
    "name": "Галина",
    "age": "21",
    "sex": "Ж"
  },
  "complain": {
    "complain1": "Дорожньо-транспортні пригоди",
    "complain2": "Дихання порушене, Свідомість порушена",
    "complain3": "Політравма",
    "complain4": "Землетруси"
  },
  "call_address": {
    "district": "Печерський",
    "city": "м.Київ",
    "street": "вул.Жовтневої революциї",
    "building": "13/4",
    "apartment": "4",
    "location_type": "місто",
    "address_type": "квартира",
    "longitude": "10,21339909",
    "latitude": "80,738734987"
  }
}
*/
class Card {
  constructor(id, region, callAddress, callerNumber, startDatetime, patient, complain, callPriority, callComment) {
    this.id = this.validateString(id);
    this.callerNumber = this.validateString(callerNumber);
    this.callPriority = this.validateString(callPriority);
    this.callComment = this.validateString(callComment);
    this.dateTime = { startDatetime };
    this.location = {
      region: this.validateString(region),
      callAddress: this.validateObj(callAddress, 'callAddress'),
    };
    this.patient = this.validateObj(patient, 'patient');
    this.complains = Object.values(this.validateObj(complain, 'complains'));
  }
  getPatientStr() {
    return `*Інформація про пацієнта:*\n\t👤 *Ім\'я:* ${this.patient.name}\n\t👤 *Вік:* ${this.patient.age}\n\t👤 *Стать:* ${this.patient.sex}`;
  }
  getComplainsStr() {
    return `*Скарга:*\n\t🤕 *Головна скарга:* ${this.complains[0]}\n\t🤕 *Життєві показники:* ${this.complains[1]}\n\t🤕 *Стан пацієнта:* ${this.complains[2]}\n\t🔥 *Обставини події:* ${this.complains[3]}`;
  }
  getCallInfoStr() {
    return `*Отримано виклик №"${this.id}" з пріоритетом "${this.callPriority}"*`;
  }
  getLocationStr() {
    return `*Адреса виклику:*\n\t📍 *Область:* ${this.location.region}\n\t📍 *Місто:* ${this.location.callAddress.city}\n\t📍 *Район:* ${this.location.callAddress.district}\n\t📍 *Вулиця:* ${this.location.callAddress.street}\n\t📍 *Будинок:* ${this.location.callAddress.building}\n\t📍 *Квартира:* ${this.location.callAddress.apartment}`;
  }
  getCallerNumberStr() {
    return `*Телефон викликаючого:*\n\t☎️ ${this.callerNumber}`;
  }
  getCommentStr() {
    return `*Коментар:*\n\t📋 ${this.callComment}`;
  }
  get() {
    return `${this.getCallInfoStr()}\n\n${this.getCallerNumberStr()}\n\n${this.getLocationStr()}\n\n${this.getComplainsStr()}\n\n${this.getPatientStr()}\n\n${this.getCommentStr()}`
  }
  validateString(str = '') {
    return str.trim().length ? str : null;
  }
  validateObj(obj = {}, name) {
    const options = {
      callAddress: ['district', 'city', 'street', 'building', 'apartment', 'location_type', 'address_type', 'latitude', 'longitude'],
      patient: ['name', 'age', 'sex'],
      complains: ['complain1', 'complain2', 'complain3', 'complain4'],
    }

    options[name].forEach((option) => {
      if (!obj[option]) {
        obj[option] = null;
      }
    });

    return obj;
  }
}

module.exports = { Card }
