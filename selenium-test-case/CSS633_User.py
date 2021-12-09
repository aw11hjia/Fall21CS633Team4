from selenium import webdriver
import time
from selenium.webdriver.support.ui import Select

#Opening the link in the Chrome Driver 
driver= webdriver.Chrome(executable_path=r"C:\Users\Ajith Krishna\chromedriver.exe")
driver.get("https://cs633-team4-class-scheduler.glitch.me/login")
driver.maximize_window()
driver.implicitly_wait(10)

# Registering a new user
driver.find_element_by_xpath("/html/body/div/div/form/fieldset[4]/a").click()
driver.find_element_by_xpath("/html/body/div/div/form/fieldset[1]/table/tbody/tr/td/input").send_keys("Hamilton217")
time.sleep(1)
driver.find_element_by_xpath("/html/body/div/div/form/fieldset[2]/table/tbody/tr/td/input").send_keys("password")
time.sleep(1)
driver.find_element_by_xpath("/html/body/div/div/form/fieldset[3]/table/tbody/tr/td/input").send_keys("Ajay")
time.sleep(1)
driver.find_element_by_xpath("/html/body/div/div/form/fieldset[4]/table/tbody/tr/td/input").send_keys("Kumar")
time.sleep(1)
driver.find_element_by_xpath("/html/body/div/div/form/fieldset[5]/label[1]/input").click()
time.sleep(1)
driver.find_element_by_xpath("/html/body/div/div/form/fieldset[6]/table/tbody/tr/td/input").send_keys("06/30/1999")
time.sleep(1)
driver.find_element_by_xpath("/html/body/div/div/form/fieldset[7]/button").click()

#Login page using credentials
driver.find_element_by_xpath("/html/body/div/div/form/fieldset[1]/table/tbody/tr/td/input").send_keys("Hamilton007")
driver.find_element_by_xpath("/html/body/div/div/form/fieldset[2]/table/tbody/tr/td/input").send_keys("password")
time.sleep(2)
driver.find_element_by_xpath("/html/body/div/div/form/fieldset[3]/button").click()

#Choosing the class
drop=Select(driver.find_element_by_xpath("/html/body/div[2]/div/form/fieldset[1]/select"))
drop.select_by_visible_text("CS")
driver.find_element_by_xpath("/html/body/div[2]/div/form/fieldset[3]/button").click()
driver.find_element_by_xpath("/html/body/div[2]/div/div[1]/table/tbody/tr[2]/td[1]/input").click()
driver.find_element_by_xpath("/html/body/div[2]/div/button").click()
time.sleep(2)

#Dropping the class
driver.find_element_by_xpath("/html/body/div/div/div/table/tbody/tr[2]/td[1]/input").click()
driver.find_element_by_xpath("/html/body/div/div/button").click()
time.sleep(1)
driver.find_element_by_xpath("/html/body/header/form/button").click()
time.sleep(2)

driver.close()
driver.quit()
