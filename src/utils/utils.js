import React from "react";
import TrendingFlat from "@material-ui/icons/TrendingFlat";

export const getColumns = () => {
  return [
    { title: "Label", field: "label" },
    {
      title: "Min Amount (£)",
      field: "minAmount",
      type: "numeric",
      defaultSort: "asc",
      cellStyle: {
        textAlign: "right"
      },
      headerStyle: {
        textAlign: "right"
      }
    },
    {
      render: () => <TrendingFlat />,
      cellStyle: {
        textAlign: "center"
      },
      headerStyle: {
        textAlign: "center"
      }
    },
    {
      title: "Max Amount (£)",
      field: "maxAmount",
      type: "numeric",
      cellStyle: {
        textAlign: "left"
      },
      headerStyle: {
        textAlign: "left"
      }
    },
    {
      title: "Fee",
      field: "fee",
      type: "numeric",
      cellStyle: {
        textAlign: "center"
      },
      headerStyle: {
        textAlign: "center",
        paddingRight: "40px"
      }
    }
  ];
};

export const checkOverlap = (timeRanges, selectedRange) => {
  var isValid = true;
  var minStart = timeRanges[0].minAmount;
  var maxEnd = timeRanges[timeRanges.length - 1].maxAmount;

  if (
    selectedRange.minAmount < selectedRange.maxAmount &&
    selectedRange.minAmount > minStart &&
    selectedRange.maxAmount < maxEnd
  ) {
    for (var i = 0; i < timeRanges.length; i++) {
      if (
        (selectedRange.minAmount >= timeRanges[i].minAmount &&
          selectedRange.minAmount <= timeRanges[i].maxAmount) ||
        (selectedRange.maxAmount >= timeRanges[i].minAmount &&
          selectedRange.maxAmount <= timeRanges[i].maxAmount)
      ) {
        isValid = false;
        break;
      } else if (i !== timeRanges.length - 1) {
        if (
          selectedRange.minAmount > timeRanges[i].maxAmount &&
          selectedRange.minAmount < timeRanges[i + 1].minAmount
        ) {
          if (selectedRange.maxAmount < timeRanges[i + 1].minAmount) {
            break;
          } else {
            isValid = false;
            break;
          }
        }
      }
    }
  } else {
    isValid = false;
  }
  // return {isValid: isValid, error: error }
  return isValid;
};

export const checkForOverlappingRanges = data => {
  var errors = [];
  data.forEach(firstElement => {
    data.forEach(secondElement => {
      if (
        isOverlap(
          firstElement.minAmount,
          firstElement.maxAmount,
          secondElement.minAmount,
          secondElement.maxAmount
        ) &&
        firstElement !== secondElement
      ) {
        pushIfUnique(errors, firstElement);
        pushIfUnique(errors, secondElement);
      }
    });
  });
  return errors;
};

const pushIfUnique = (array, object) => {
  if (array.findIndex(x => x.label === object.label) === -1) {
    array.push(object);
  }
};

const isOverlap = (x1, x2, y1, y2) => {
  return Math.max(x1, y1) <= Math.min(x2, y2);
};

export const checkForMissingFields = data => {
  var errors = [];
  data.forEach(feeEntry => {
    if (
      !feeEntry.label ||
      !feeEntry.minAmount ||
      !feeEntry.maxAmount ||
      !feeEntry.fee
    ) {
      errors.push(feeEntry);
    }
  });
  return errors;
};

export const checkForOverlap = data => {
  var errors = [];
  data.forEach(feeEntry => {
    if (feeEntry.minAmount > feeEntry.maxAmount) {
      errors.push(feeEntry);
    }
  });
  return errors;
};
