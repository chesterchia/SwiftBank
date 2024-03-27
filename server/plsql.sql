
---------PROCEDURE--------

-------
CREATE or REPLACE PROCEDURE insert_into_emp_login(un in varchar, up in varchar)
LANGUAGE SQL AS
$$
insert into EMP_LOGIN(username,user_password) values(un,up);
$$;
---------
CREATE or REPLACE PROCEDURE insert_into_customer(nm in varchar(50), ph in varchar(50), em in varchar(50), hn in varchar(50),city in varchar(50), zp in varchar(50),un in varchar(50),pwd in varchar(50)) 
LANGUAGE SQL AS
$$
INSERT INTO CUSTOMER 
(customer_id,name,phone,email,house_no,city,zipcode,username,password)
VALUES
(NEXTVAL('c_id_sequence'),nm,ph,em,hn,city,zp,un,pwd);
$$;
----------
CREATE or replace PROCEDURE insert_into_accounts(cid in varchar(50),cur_bal in varchar(50))
LANGUAGE SQL AS
$$
INSERT INTO ACCOUNTS 
(account_id, customer_id, date_opened,current_balance)
VALUES
(NEXTVAL('a_id_sequence'), cast(cid as integer),CURRENT_DATE,cast(cur_bal as float(20)));
$$;
--------
CREATE or REPLACE PROCEDURE insert_into_branch(nm in varchar(50),hn in varchar(50),cy in varchar(50),zc in varchar(50))
LANGUAGE SQL AS
$$
INSERT INTO BRANCH VALUES (NEXTVAL('b_id_sequence'),nm,hn,cy,zc);
$$;
--------------

CREATE OR REPLACE PROCEDURE insert_into_transaction(aid in varchar(50),bid in varchar(50),amt in varchar(50),acn in varchar(50))
LANGUAGE SQL AS 	
$$
INSERT INTO TRANSACTION VALUES (NEXTVAL('t_id_sequence'),cast(aid as integer),cast(bid as integer),CURRENT_DATE, cast(amt as float(20)),acn);
UPDATE accounts
SET current_balance=current_balance+cast(amt as float)
WHERE account_id = cast(aid as integer);
$$;
----------











------function------

----1-----

create or replace function get_current_amount(a_id numeric) returns numeric AS
$$
DECLARE 
	current_amount numeric;
BEGIN
	
	select current_balance into current_amount  from accounts where account_id=a_id;
	
	return current_amount;
END;
$$ LANGUAGE plpgsql;


----2------

create or replace function get_transaction(a_id numeric) returns REFCURSOR AS

$$
DECLARE
	my_cursor REFCURSOR;
BEGIN
	
	open my_cursor for  select TRANSACTION_ID,BRANCH_ID,DATE_OF_TRANSACTION,AMOUNT,ACTION from TRANSACTION 
  where ACCOUNT_ID= a_id order by date_of_transaction desc;
	return my_cursor;

END;
$$ LANGUAGE plpgsql;
----3----

create or replace function e_login(f_name VARCHAR, f_password VARCHAR) returns REFCURSOR AS
$$
DECLARE
	my_cursor REFCURSOR;
BEGIN
	
	open my_cursor for  select USERNAME,U_PASSWORD from EMP_LOGIN 
  where USERNAME=f_name and U_PASSWORD=f_password ;

	return my_cursor;

END;
$$ LANGUAGE plpgsql;

-----4-----

create or replace function customer_info(a_id numeric) returns REFCURSOR AS
$$
DECLARE
	my_cursor REFCURSOR;
BEGIN
	
	open my_cursor for  select name,PHONE from ACCOUNTS ac
                      join CUSTOMER c on (ac.customer_id=c.customer_id) where account_id=a_id;

	return my_cursor;

END;
$$ LANGUAGE plpgsql;




-----TRIGGER-----

---1----
CREATE OR REPLACE FUNCTION deposit_balance_function() 
RETURNS TRIGGER AS $$
DECLARE 
    a_id numeric;
    balance FLOAT;
    t_type VARCHAR(20);
BEGIN 
	IF NEW.ACTION = 'Deposit' THEN
        a_id := NEW.ACCOUNT_ID;
        balance := NEW.AMOUNT;
        t_type := NEW.ACTION;
		
		RAISE NOTICE 'Account ID: %', a_id;
        RAISE NOTICE 'Amount: %', balance;
        RAISE NOTICE 'Action: %', t_type;

        UPDATE ACCOUNTS
        SET CURRENT_BALANCE = CURRENT_BALANCE + balance
        WHERE ACCOUNT_ID = a_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER deposit_balance
AFTER INSERT ON TRANSACTION 
FOR EACH ROW 
EXECUTE FUNCTION deposit_balance_function();

----2------

CREATE OR REPLACE FUNCTION withdraw_balance_function() 
RETURNS TRIGGER AS $$
DECLARE 
		a_id numeric;
		balance FLOAT;
		t_type VARCHAR(20);
BEGIN 
	IF NEW.ACTION = 'Withdraw' THEN
			a_id := NEW.ACCOUNT_ID;
			balance := NEW.AMOUNT;
			t_type := NEW.ACTION;
			
			RAISE NOTICE 'Account ID: %', a_id;
       		RAISE NOTICE 'Amount: %', balance;
        	RAISE NOTICE 'Action: %', t_type;

			UPDATE ACCOUNTS
			SET CURRENT_BALANCE=CURRENT_BALANCE-balance
			WHERE ACCOUNT_ID= a_id;
		END IF;
		
		RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER withdraw_balance
AFTER INSERT ON TRANSACTION 
FOR EACH ROW 
EXECUTE FUNCTION withdraw_balance_function();



