export interface AccountDetails {
  accountId:            string;
  balance:              number;
  currentPage:          number;
  totalPages:           number;
  size:                 number;
  accountOperationDTOS: Array<AccountOperationDTO>;
}

export interface AccountOperationDTO {
  id:            number;
  operationDate: Date;
  amount:        number;
  description:   string;
  type:          string;
}
