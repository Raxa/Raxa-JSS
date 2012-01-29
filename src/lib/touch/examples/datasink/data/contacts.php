<?php

$sorters = json_decode(stripslashes($_GET['sort']), true);

$data = array(
    array("firstName" => "Tommy", "lastName" => "Maintz"),
    array("firstName" => "Tommy", "lastName" => "Dougan"),
    array("firstName" => "Tommy", "lastName" => "Avins"),
    array("firstName" => "Tommy", "lastName" => "Conran"),
    array("firstName" => "Ed", "lastName" => "Spencer"),
    array("firstName" => "Jamie", "lastName" => "Avins"),
    array("firstName" => "Aaron", "lastName" => "Conran"),
    array("firstName" => "Dave", "lastName" => "Kaneda"),
    array("firstName" => "Robert", "lastName" => "Dougan"),
    array("firstName" => "Abraham", "lastName" => "Elias"),
    array("firstName" => "Tommy", "lastName" => "Maintz"),
    array("firstName" => "Jay", "lastName" => "Robinson"),
    array("firstName" => "Nico", "lastName" => "Ferrero")
);

function compare_firstname_asc($a, $b) {
    return strnatcmp($a['firstName'], $b['firstName']);
}

function compare_firstname_desc($a, $b) {
    return strnatcmp($b['firstName'], $a['firstName']);
}

function compare_lastname_asc($a, $b) {
    return strnatcmp($a['lastName'], $b['lastName']);
}

function compare_lastname_desc($a, $b) {
    return strnatcmp($b['lastName'], $a['lastName']);
}

function compare_fullname_firstname_asc_lastname_asc($a, $b) {
    $retval = strnatcmp($a['firstName'], $b['firstName']);
    if(!$retval) return strnatcmp($a['lastName'], $b['lastName']);
    return $retval;
}

function compare_fullname_firstname_asc_lastname_desc($a, $b) {
    $retval = strnatcmp($a['firstName'], $b['firstName']);
    if(!$retval) return strnatcmp($b['lastName'], $a['lastName']);
    return $retval;
}

function compare_fullname_firstname_desc_lastname_asc($a, $b) {
    $retval = strnatcmp($b['firstName'], $a['firstName']);
    if(!$retval) return strnatcmp($a['lastName'], $b['lastName']);
    return $retval;
}

function compare_fullname_firstname_desc_lastname_desc($a, $b) {
    $retval = strnatcmp($b['firstName'], $a['firstName']);
    if(!$retval) return strnatcmp($b['lastName'], $a['lastName']);
    return $retval;
}

$firstName_direction = false;
$lastName_direction = false;

if ($sorters) {
    foreach ($sorters as $item) {
        if ($item['direction'] == "ASC") {
            if ($item['property'] == "firstName")
                $firstName_direction = "ASC";
            else
                $lastName_direction = "ASC";
        } else {
            if ($item['property'] == "firstName")
                $firstName_direction = "DESC";
            else
                $lastName_direction = "DESC";
        }
    }
}

if ($firstName_direction == "ASC") {
    if ($lastName_direction == "ASC") {
        usort($data, compare_fullname_firstname_asc_lastname_asc);
    } else if ($lastName_direction == "DESC") {
        usort($data, compare_fullname_firstname_asc_lastname_desc);
    } else {
        usort($data, compare_firstname_asc);
    }
} else if ($firstName_direction == "DESC") {
    if ($lastName_direction == "ASC") {
        usort($data, compare_fullname_firstname_desc_lastname_asc);
    } else if ($lastName_direction == "DESC") {
        usort($data, compare_fullname_firstname_desc_lastname_desc);
    } else {
        usort($data, compare_firstname_desc);
    }
} else {
    if ($lastName_direction == "ASC") {
        usort($data, compare_lastname_asc);
    } else if ($lastName_direction == "DESC") {
        usort($data, compare_lastname_desc);
    }
}

print json_encode($data);

?>