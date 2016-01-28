#include "jsoncpp.cpp"
#include "json/json.h"
#include<iostream>
#include<vector>
#include<fstream>
#include<algorithm>
#include<map>
using namespace std;
using namespace Json;


vector<int> vi[400], vo[400];
string phil_name[400];
map<string, int> dict;
bool bylo[400];
int czas[400];
int t; 

void dfs(int x)
{
	bylo[x] = 1;
	for (int j = 0; j < vo[x].size(); j++)
	{
		if (!bylo[vo[x][j]])
			dfs(vo[x][j]);
	}
	czas[x] = t;
	t++;
}

void remove_duplicates(vector<int>& v)
{
	bool b[1000];
	for (int i = 0; i < 1000; i++)
		b[i] = 0;
	vector<int> ret;
	for (int i = 0; i < v.size(); i++)
	{
		if (!b[i])
		{
			ret.push_back(v[i]);
			b[v[i]] = 1;
		}
	}
	swap(ret, v);
}

int main ()
{
	Value root;
	ifstream input("info.json");
	input >> root;
	Value philos = root["philosophers"];
	int num_philos = philos.size();
	int temp;
	for (int i = 0; i < philos.size(); i++)
	{
		dict[philos[i].get("name", "error").asString()] = i;
		phil_name[i] = philos[i].get("name", "error").asString();
		Value outs = philos[i]["influenced"];
		for (int j = 0; j < outs.size(); j++)
		{
			temp = dict[outs[j].asString()];
			vi[i].push_back(temp);
			vo[temp].push_back(i);
		}
		Value ins = philos[i]["influences"];
		for (int j = 0; j < ins.size(); j++)
		{
			temp = dict[ins[j].asString()];
			vo[i].push_back(temp);
			vi[temp].push_back(i);
		}
	}
	cout << "yolo" << endl;
	for (int i = 0; i < num_philos; i++)
	{
		for (int j = 0; j < vi[i].size(); j++)
		{
			remove_duplicates(vi[i]);
			remove_duplicates(vo[i]);
		}
	}
	cout << "elo" << endl;
	for (int i = 0; i < num_philos; i++)
	{
		if (!bylo[i])
			dfs(i);
	}
	Value phils_proc[400];
	for (int i = 0;i < num_philos; i++)
	{
		phils_proc[i]["name"] = phil_name[i];
		phils_proc[i]["influences"] = get_influences(i);
		phils_proc[i]["influenced"] = get_influenced(i);
		phils_proc[i]["wikilink"] = philos[i].get("name", "error").asString()
	}

	cout << philos;

}cd 