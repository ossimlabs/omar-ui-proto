export const toPoint = (mgrs) => {
  let bbox = UTMtoLL(decode(mgrs.toUpperCase()));
  if (bbox.lat && bbox.lon) {
    return [bbox.lon, bbox.lat];
  }
  return [(bbox.left + bbox.right) / 2, (bbox.top + bbox.bottom) / 2];
}

export const dmsToDd = ( degrees, minutes, seconds, position ) => {
  let dd = Math.abs( degrees ) + Math.abs( minutes / 60 ) + Math.abs( seconds / 3600 )
  if ( position.toUpperCase() === 'S' || position.toUpperCase() === 'W' )
    { dd = -dd; }
  return dd
}

let NUM_100K_SETS = 6;
let SET_ORIGIN_COLUMN_LETTERS = 'AJSAJS';
let SET_ORIGIN_ROW_LETTERS = 'AFAFAF';
let A = 65; // A
let I = 73; // I
let O = 79; // O
let V = 86; // V
let Z = 90; // Z

function UTMtoLL(utm) {

    let UTMNorthing = utm.northing;
    let UTMEasting = utm.easting;
    let zoneLetter = utm.zoneLetter;
    let zoneNumber = utm.zoneNumber;
    // check the ZoneNummber is valid
    if (zoneNumber < 0 || zoneNumber > 60) {
        return null;
    }

    let k0 = 0.9996;
    let a = 6378137.0; //ellip.radius;
    let eccSquared = 0.00669438; //ellip.eccsq;
    let eccPrimeSquared;
    let e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));
    let N1, T1, C1, R1, D, M;
    let LongOrigin;
    let mu, phi1Rad;

    // remove 500,000 meter offset for longitude
    let x = UTMEasting - 500000.0;
    let y = UTMNorthing;

    // We must know somehow if we are in the Northern or Southern
    // hemisphere, this is the only time we use the letter So even
    // if the Zone letter isn't exactly correct it should indicate
    // the hemisphere correctly
    if (zoneLetter < 'N') {
        y -= 10000000.0; // remove 10,000,000 meter offset used
        // for southern hemisphere
    }

    // There are 60 zones with zone 1 being at West -180 to -174
    LongOrigin = (zoneNumber - 1) * 6 - 180 + 3; // +3 puts origin
    // in middle of
    // zone

    eccPrimeSquared = (eccSquared) / (1 - eccSquared);

    M = y / k0;
    mu = M / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));

    phi1Rad = mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu) + (151 * e1 * e1 * e1 / 96) * Math.sin(6 * mu);
    // double phi1 = ProjMath.radToDeg(phi1Rad);

    N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
    T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
    C1 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
    R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
    D = x / (N1 * k0);

    let lat = phi1Rad - (N1 * Math.tan(phi1Rad) / R1) * (D * D / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) * D * D * D * D / 24 + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C1 * C1) * D * D * D * D * D * D / 720);
    lat = radToDeg(lat);

    let lon = (D - (1 + 2 * T1 + C1) * D * D * D / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * eccPrimeSquared + 24 * T1 * T1) * D * D * D * D * D / 120) / Math.cos(phi1Rad);
    lon = LongOrigin + radToDeg(lon);

    let result;
    if (utm.accuracy) {
        let topRight = UTMtoLL({
            northing: utm.northing + utm.accuracy,
            easting: utm.easting + utm.accuracy,
            zoneLetter: utm.zoneLetter,
            zoneNumber: utm.zoneNumber
        });
        result = {
            top: topRight.lat,
            right: topRight.lon,
            bottom: lat,
            left: lon
        };
    }
    else {
        result = {
            lat: lat,
            lon: lon
        };
    }
    return result;
}

function decode(mgrsString) {

    if (mgrsString && mgrsString.length === 0) {
        throw ('MGRSPoint coverting from nothing');
    }

    let length = mgrsString.length;

    let hunK = null;
    let sb = '';
    let testChar;
    let i = 0;

    // get Zone number
    while (!(/[A-Z]/).test(testChar = mgrsString.charAt(i))) {
        if (i >= 2) {
            throw ('MGRSPoint bad conversion from: ' + mgrsString);
        }
        sb += testChar;
        i++;
    }

    let zoneNumber = parseInt(sb, 10);

    if (i === 0 || i + 3 > length) {
        // A good MGRS string has to be 4-5 digits long,
        // ##AAA/#AAA at least.
        throw ('MGRSPoint bad conversion from: ' + mgrsString);
    }

    let zoneLetter = mgrsString.charAt(i++);

    // Should we check the zone letter here? Why not.
    if (zoneLetter <= 'A' || zoneLetter === 'B' || zoneLetter === 'Y' || zoneLetter >= 'Z' || zoneLetter === 'I' || zoneLetter === 'O') {
        throw ('MGRSPoint zone letter ' + zoneLetter + ' not handled: ' + mgrsString);
    }

    hunK = mgrsString.substring(i, i += 2);

    let set = get100kSetForZone(zoneNumber);

    let east100k = getEastingFromChar(hunK.charAt(0), set);
    let north100k = getNorthingFromChar(hunK.charAt(1), set);

    // We have a bug where the northing may be 2000000 too low.
    // How
    // do we know when to roll over?

    while (north100k < getMinNorthing(zoneLetter)) {
        north100k += 2000000;
    }

    // calculate the char index for easting/northing separator
    let remainder = length - i;

    if (remainder % 2 !== 0) {
        throw ('MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters' + mgrsString);
    }

    let sep = remainder / 2;

    let sepEasting = 0.0;
    let sepNorthing = 0.0;
    let accuracyBonus, sepEastingString, sepNorthingString, easting, northing;
    if (sep > 0) {
        accuracyBonus = 100000.0 / Math.pow(10, sep);
        sepEastingString = mgrsString.substring(i, i + sep);
        sepEasting = parseFloat(sepEastingString) * accuracyBonus;
        sepNorthingString = mgrsString.substring(i + sep);
        sepNorthing = parseFloat(sepNorthingString) * accuracyBonus;
    }

    easting = sepEasting + east100k;
    northing = sepNorthing + north100k;

    return {
        easting: easting,
        northing: northing,
        zoneLetter: zoneLetter,
        zoneNumber: zoneNumber,
        accuracy: accuracyBonus
    };
}

function get100kSetForZone(i) {
    let setParm = i % NUM_100K_SETS;
    if (setParm === 0) {
        setParm = NUM_100K_SETS;
    }

    return setParm;
}

/**
 * Given the first letter from a two-letter MGRS 100k zone, and given the
 * MGRS table set for the zone number, figure out the easting value that
 * should be added to the other, secondary easting value.
 *
 * @private
 * @param {char} e The first letter from a two-letter MGRS 100´k zone.
 * @param {number} set The MGRS table set for the zone number.
 * @return {number} The easting value for the given letter and set.
 */
function getEastingFromChar(e, set) {
    // colOrigin is the letter at the origin of the set for the
    // column
    let curCol = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(set - 1);
    let eastingValue = 100000.0;
    let rewindMarker = false;

    while (curCol !== e.charCodeAt(0)) {
        curCol++;
        if (curCol === I) {
            curCol++;
        }
        if (curCol === O) {
            curCol++;
        }
        if (curCol > Z) {
            if (rewindMarker) {
                throw ('Bad character: ' + e);
            }
            curCol = A;
            rewindMarker = true;
        }
        eastingValue += 100000.0;
    }

    return eastingValue;
}

/**
 * Given the second letter from a two-letter MGRS 100k zone, and given the
 * MGRS table set for the zone number, figure out the northing value that
 * should be added to the other, secondary northing value. You have to
 * remember that Northings are determined from the equator, and the vertical
 * cycle of letters mean a 2000000 additional northing meters. This happens
 * approx. every 18 degrees of latitude. This method does *NOT* count any
 * additional northings. You have to figure out how many 2000000 meters need
 * to be added for the zone letter of the MGRS coordinate.
 *
 * @private
 * @param {char} n Second letter of the MGRS 100k zone
 * @param {number} set The MGRS table set number, which is dependent on the
 *     UTM zone number.
 * @return {number} The northing value for the given letter and set.
 */
function getNorthingFromChar(n, set) {

    if (n > 'V') {
        throw ('MGRSPoint given invalid Northing ' + n);
    }

    // rowOrigin is the letter at the origin of the set for the
    // column
    let curRow = SET_ORIGIN_ROW_LETTERS.charCodeAt(set - 1);
    let northingValue = 0.0;
    let rewindMarker = false;

    while (curRow !== n.charCodeAt(0)) {
        curRow++;
        if (curRow === I) {
            curRow++;
        }
        if (curRow === O) {
            curRow++;
        }
        // fixing a bug making whole application hang in this loop
        // when 'n' is a wrong character
        if (curRow > V) {
            if (rewindMarker) { // making sure that this loop ends
                throw ('Bad character: ' + n);
            }
            curRow = A;
            rewindMarker = true;
        }
        northingValue += 100000.0;
    }

    return northingValue;
}

/**
 * The function getMinNorthing returns the minimum northing value of a MGRS
 * zone.
 *
 * Ported from Geotrans' c Lattitude_Band_Value structure table.
 *
 * @private
 * @param {char} zoneLetter The MGRS zone to get the min northing for.
 * @return {number}
 */
function getMinNorthing(zoneLetter) {
    let northing;
    switch (zoneLetter) {
        case 'C':
            northing = 1100000.0;
            break;
        case 'D':
            northing = 2000000.0;
            break;
        case 'E':
            northing = 2800000.0;
            break;
        case 'F':
            northing = 3700000.0;
            break;
        case 'G':
            northing = 4600000.0;
            break;
        case 'H':
            northing = 5500000.0;
            break;
        case 'J':
            northing = 6400000.0;
            break;
        case 'K':
            northing = 7300000.0;
            break;
        case 'L':
            northing = 8200000.0;
            break;
        case 'M':
            northing = 9100000.0;
            break;
        case 'N':
            northing = 0.0;
            break;
        case 'P':
            northing = 800000.0;
            break;
        case 'Q':
            northing = 1700000.0;
            break;
        case 'R':
            northing = 2600000.0;
            break;
        case 'S':
            northing = 3500000.0;
            break;
        case 'T':
            northing = 4400000.0;
            break;
        case 'U':
            northing = 5300000.0;
            break;
        case 'V':
            northing = 6200000.0;
            break;
        case 'W':
            northing = 7000000.0;
            break;
        case 'X':
            northing = 7900000.0;
            break;
        default:
            northing = -1.0;
    }
    if (northing >= 0.0) {
        return northing;
    }
    else {
        throw ('Invalid zone letter: ' + zoneLetter);
    }
}

function radToDeg(rad) {
    return (180.0 * (rad / Math.PI));
}